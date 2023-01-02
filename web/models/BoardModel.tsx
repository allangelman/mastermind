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
  readonly numSlots: number;
  private readonly numRows: number;
  readonly optionsModel: OptionsModel;
  readonly code: number[];
  readonly id: string;
  readonly existingRows: RowModel[];
  currentRound: number;
  readonly rowModels: RowModel[];
  result?: GameResult;
  readonly name?: string;
  private readonly gql: GQLClient;

  constructor(
    numSlots: number,
    numRows: number,
    optionsModel: OptionsModel,
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
    this.optionsModel = optionsModel;
    this.currentRound = result ? existingRows.length - 1 : existingRows.length;
    this.rowModels = [];
    this.existingRows = existingRows;
    this.result = result;
    this.name = name;
    this.gql = new GQLClient();

    for (let i = 0; i < existingRows.length; i++) {
      const row = existingRows[i];
      this.rowModels.push(row);
    }

    for (let i = existingRows.length; i < numRows; i++) {
      const row = new RowModel(this.numSlots, code, i, this.id);
      this.rowModels.push(row);
    }
  }

  incrementRound(): void {
    if (!this.result) this.currentRound += 1;
  }

  decrementRound(): void {
    this.currentRound -= 1;
  }

  getCurrentOption(): number {
    return this.optionsModel.getCurrentOption();
  }

  getResult(rowNumber: number): GameResult | undefined {
    const rowFeedback = this.rowModels[rowNumber].feedback;
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

  private async updateResult(result: string): Promise<void> {
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
