import { BoardModel, GameResult } from "./BoardModel";
import { CompetitorBoardModel } from "./CompetitorBoardModel";
import {
  getOtherBoardData,
  getOtherBoardVariables,
  GET_OTHER_BOARDS_FEEDBACK,
  otherBoardData,
  UPDATE_MULTI_GAME_RESULT,
  updateMultiGameResultData,
  updateMultiGameResultVariables,
  GQLClient,
} from "../lib/graphQLClient";

export class GameModel {
  board: BoardModel;
  competitorBoards: CompetitorBoardModel[] = [];
  id: string;
  multiPlayerResult?: string;
  gql: GQLClient;

  constructor(id: string, gameBoard: BoardModel, multiPlayerResult?: string) {
    this.id = id;

    this.board = gameBoard;
    this.multiPlayerResult = multiPlayerResult;
    this.gql = new GQLClient();
  }

  getMultiPlayerGameResult(): string | undefined {
    const resultsMap: Map<string, GameResult | ""> = new Map([]);

    resultsMap.set(
      this.board.name ?? "anon", //shouldn't ever be anon
      this.board.result ? this.board.result : ""
    );

    this.competitorBoards.forEach((competitorBoard) => {
      resultsMap.set(
        competitorBoard.name ?? "anon", //shouldn't ever be anon
        competitorBoard.result ? competitorBoard.result : ""
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

  async updateMultiPlayerResult(result: string): Promise<void> {
    await this.gql.request<
      updateMultiGameResultData,
      updateMultiGameResultVariables
    >(UPDATE_MULTI_GAME_RESULT, {
      updateMultGameBoardInput: {
        id: this.id,
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
      gameId: this.id,
      myBoardId: this.board.id,
    });

    const feedbackList = getBoardData.findOtherPlayerGameBoards;

    const values = feedbackList.map(
      (data: otherBoardData) =>
        new CompetitorBoardModel(data.id, data.rows, data.name, data.result)
    );

    this.competitorBoards = values;

    return values;
  }
}
