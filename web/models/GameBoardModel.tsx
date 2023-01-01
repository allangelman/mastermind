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
import { CompetitorBoardModel } from "./CompetitorBoardModel";

export type GameResult = "Won" | "Lost";

export class GameBoardModel {
  readonly options: OptionsModel;
  readonly numSlots: number;
  currentRound: number;
  gameBoard: GameBoardRowModel[];
  id: string;
  gameResult?: GameResult;
  numRows: number;
  code: number[];
  gameId: string;
  existingRows: GameBoardRowModel[];
  otherBoardData: CompetitorBoardModel[] = [];
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
    if (!this.gameResult && !this.multiPlayerResult) this.currentRound += 1;
  }

  decrementRound(): void {
    this.currentRound -= 1;
  }

  getCurrentOption(): number {
    return this.options.getCurrentOption();
  }

  getGameResult(rowNumber: number): GameResult | undefined {
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
    } else {
      return undefined;
    }
  }

  getMultiPlayerGameResult(): string | undefined {
    const resultsMap: Map<string, GameResult | ""> = new Map([]);

    resultsMap.set(
      this.name ?? "anon", //shouldn't ever be anon
      this.gameResult ? this.gameResult : ""
    );

    this.otherBoardData.forEach((otherBoard) => {
      resultsMap.set(
        otherBoard.name ?? "anon", //shouldn't ever be anon
        otherBoard.result ? otherBoard.result : ""
      );
    });

    let allPlayersLost = true;
    let winner;
    resultsMap.forEach((result, name) => {
      if (result !== "Lost") {
        allPlayersLost = false;
      }
      if (result === "Won") {
        winner = name;
      }
    });

    let multiPlayerGameResult;
    if (winner) {
      multiPlayerGameResult = `${winner} Won!`;
    } else if (allPlayersLost) {
      multiPlayerGameResult = `All lost!`;
    } else {
      multiPlayerGameResult = undefined;
    }

    return multiPlayerGameResult;
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

  setMultiPlayerResult(result: string): void {
    this.multiPlayerResult = result;
  }

  async getCompetitorBoards(): Promise<CompetitorBoardModel[]> {
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
        new CompetitorBoardModel(data.id, data.rows, data.name, data.result)
    );

    this.otherBoardData = values;

    return values;
  }
}
