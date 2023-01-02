import { RowModel } from "./RowModel";
import { OptionsModel } from "./OptionsModel";
import {
  GQLClient,
  updateBoardResultData,
  updateBoardResultVariables,
  UPDATE_GAME_RESULT,
} from "../lib/graphQLClient";

export type GameResult = "Won" | "Lost";

export class BoardModel {
  readonly options: OptionsModel;
  readonly numSlots: number;
  currentRound: number;
  rows: RowModel[];
  id: string;
  result?: GameResult;
  numRows: number;
  code: number[];
  existingRows: RowModel[];
  name?: string;
  gql: GQLClient;

  constructor(
    numSlots: number,
    numRows: number,
    options: OptionsModel,
    code: number[],
    id: string,
    existingRows: RowModel[],
    result?: GameResult,
    name?: string
  ) {
    this.numSlots = numSlots;
    this.id = id;
    this.code = code;
    this.numRows = numRows;
    this.options = options;
    this.currentRound = result ? existingRows.length - 1 : existingRows.length;
    this.rows = [];
    this.existingRows = existingRows;
    this.result = result;

    this.name = name;
    this.gql = new GQLClient();

    for (let i = 0; i < existingRows.length; i++) {
      const row = existingRows[i];
      this.rows.push(row);
    }

    for (let i = existingRows.length; i < numRows; i++) {
      const row = new RowModel(this.numSlots, code, i, this.id);
      this.rows.push(row);
    }
  }

  incrementRound(): void {
    if (!this.result) this.currentRound += 1;
  }

  decrementRound(): void {
    this.currentRound -= 1;
  }

  getCurrentOption(): number {
    return this.options.getCurrentOption();
  }

  getResult(rowNumber: number): GameResult | undefined {
    const rowFeedback = this.rows[rowNumber].feedback;
    const wonState = [2, 2, 2, 2];
    const state = rowFeedback.every((val, index) => val === wonState[index]);
    if (state === true) {
      this.result = "Won";
      this.updateResult("Won");
      return "Won";
    } else if (state === false && this.currentRound === this.numRows - 1) {
      this.result = "Lost";
      this.updateResult("Lost");
      return "Lost";
    } else {
      return undefined;
    }
  }

  async updateResult(result: string): Promise<void> {
    await this.gql.request<updateBoardResultData, updateBoardResultVariables>(
      UPDATE_GAME_RESULT,
      {
        updateGameBoardInput: {
          id: this.id,
          result: result,
        },
      }
    );
  }
}
