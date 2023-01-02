import { BoardModel, GameResult } from "./BoardModel";
import { CompetitorBoardModel } from "./CompetitorBoardModel";
import {
  GQLClient,
  CompetitorBoardData,
  GET_COMPETITOR_BOARDS_FEEDBACK,
  getCompetitorBoardVariables,
  getCompetitorBoardData,
  updateMultiplayerResultData,
  updateMultiplayerResultVariables,
  UPDATE_MULTIPLAYER_RESULT,
} from "../lib/graphQLClient";

export class GameModel {
  readonly board: BoardModel;
  private competitorBoards: CompetitorBoardModel[] = [];
  readonly id: string;
  multiPlayerResult?: string;
  private readonly gql: GQLClient;

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

    this.multiPlayerResult = multiPlayerGameResult;
    return multiPlayerGameResult;
  }

  async updateMultiPlayerResult(result: string): Promise<void> {
    await this.gql.request<
      updateMultiplayerResultData,
      updateMultiplayerResultVariables
    >(UPDATE_MULTIPLAYER_RESULT, {
      updateMultiplayerResultInput: {
        id: this.id,
        multiplayer_result: result,
      },
    });
  }

  async getCompetitorBoards(): Promise<CompetitorBoardModel[]> {
    const getCompetitorBoardData = await this.gql.request<
      getCompetitorBoardData,
      getCompetitorBoardVariables
    >(GET_COMPETITOR_BOARDS_FEEDBACK, {
      gameId: this.id,
      myBoardId: this.board.id,
    });

    const competitorBoards = getCompetitorBoardData.findCompetitorGameBoards;

    this.competitorBoards = competitorBoards.map(
      (data: CompetitorBoardData) =>
        new CompetitorBoardModel(data.id, data.rows, data.name, data.result)
    );

    return this.competitorBoards;
  }
}
