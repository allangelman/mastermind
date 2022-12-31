import { GameBoardRowModel } from "./GameBoardRowModel";
import { OptionsModel } from "./OptionsModel";
import {
  GQLClient,
  updateBoardResultData,
  updateBoardResultVariables,
  UPDATE_GAME_RESULT,
  getOtherBoardData,
  getOtherBoardVariables,
  GET_OTHER_BOARDS_FEEDBACK,
  otherBoardData,
  UPDATE_MULTI_GAME_RESULT,
  updateMultiGameResultData,
  updateMultiGameResultVariables,
} from "../lib/graphQLClient";
import { OtherBoardModel } from "./OtherBoardModel";

export type GameResult = "Won" | "Lost";

export class GameBoardModel {
  private readonly options: OptionsModel;
  readonly numSlots: number;
  currentRound: number;
  gameBoard: GameBoardRowModel[];
  id: string;
  gameResult?: GameResult;
  numRows: number;
  code: number[];
  gameId: string;
  existingRows: GameBoardRowModel[];
  otherBoardData?: OtherBoardModel;

  name?: string;
  multiPlayerResult?: string;
  gql: GQLClient;

  constructor(
    numSlots: number,
    numRows: number,
    options: OptionsModel,
    code: number[],
    gameId: string,
    id: string,
    existingRows: GameBoardRowModel[],
    gameResult?: GameResult,

    name?: string,
    multiPlayerResult?: string
  ) {
    this.numSlots = numSlots;
    this.id = id;
    this.code = code;
    this.gameId = gameId;
    this.numRows = numRows;
    this.options = options;
    this.currentRound = gameResult
      ? existingRows.length - 1
      : existingRows.length;
    this.gameBoard = [];
    this.existingRows = existingRows;
    this.gameResult = gameResult;

    this.name = name;
    this.multiPlayerResult = multiPlayerResult;
    this.gql = new GQLClient();

    for (let i = 0; i < existingRows.length; i++) {
      const row = existingRows[i];
      this.gameBoard.push(row);
    }

    for (let i = existingRows.length; i < numRows; i++) {
      const row = new GameBoardRowModel(this.numSlots, code, i, this.id);
      this.gameBoard.push(row);
    }
  }

  incrementRound(): void {
    if (!this.gameResult) this.currentRound += 1;
  }

  getCurrentOption(): number {
    return this.options.getCurrentOption();
  }

  checkGameResult(rowNumber: number): GameResult | undefined {
    const rowFeedback = this.gameBoard[rowNumber].feedback;
    const wonState = [2, 2, 2, 2];
    const state = rowFeedback.every((val, index) => val === wonState[index]);
    if (state === true) {
      this.gameResult = "Won";
      this.updateResult("Won");
      return "Won";
    } else if (state === false && this.currentRound === this.numRows - 1) {
      this.gameResult = "Lost";
      this.updateResult("Lost");
      return "Lost";
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

  async updateMultiPlayerResult(result: string): Promise<void> {
    await this.gql.request<
      updateMultiGameResultData,
      updateMultiGameResultVariables
    >(UPDATE_MULTI_GAME_RESULT, {
      updateMultGameBoardInput: {
        id: this.gameId,
        multiplayer_result: result,
      },
    });
  }

  async getOtherBoardFeedback(): Promise<OtherBoardModel[]> {
    const getBoardData = await this.gql.request<
      getOtherBoardData,
      getOtherBoardVariables
    >(GET_OTHER_BOARDS_FEEDBACK, {
      gameId: this.gameId,
      myBoardId: this.id,
    });

    const feedbackList = getBoardData.findOtherPlayerGameBoards;

    const values = feedbackList.map(
      (data: otherBoardData) =>
        new OtherBoardModel(data.id, data.rows, data.name, data.result)
    );

    return values;
  }
}
