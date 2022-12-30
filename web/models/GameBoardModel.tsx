import { GameBoardRowModel } from "./GameBoardRowModel";
import { OptionsModel } from "./OptionsModel";
import { PlayerModel } from "./PlayerModel";
import { GraphQLClient, gql } from "graphql-request";
import {
  GQLClient,
  updateBoardResultData,
  updateBoardResultVariables,
  UPDATE_GAME_RESULT,
  getBoardData,
  getBoardVariables,
  GET_BOARD,
  getOtherBoardData,
  getOtherBoardVariables,
  GET_OTHER_BOARDS_FEEDBACK,
  otherBoardData,
  rowFeedbackData,
} from "../lib/graphQLClient";
import { OtherBoardModel } from "./OtherBoardModel";

export type GameResult = "Won" | "Lost";

const POLL_DELAY = 3000;

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
  players: PlayerModel[] = [];
  existingRows: GameBoardRowModel[];
  otherBoardData?: OtherBoardModel;
  multiPlayerStarted?: boolean;
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
    multiPlayerStarted?: boolean
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
    this.multiPlayerStarted = multiPlayerStarted;

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

  async poll(): Promise<void> {
    return new Promise<void>((resolve) => {
      const pollBoard = async (): Promise<void> => {
        const board = await this.getOtherBoardFeedback();

        const boardONE = board[0];
        this.otherBoardData = boardONE;

        if (!boardONE.result) setTimeout(pollBoard, POLL_DELAY);
        else {
          resolve();
        }
      };

      pollBoard();
    });
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

  addPlayer(player: PlayerModel): void {
    this.players.push(player);
  }

  async updateResult(result: string): Promise<void> {
    const gql = new GQLClient();

    await gql.request<updateBoardResultData, updateBoardResultVariables>(
      UPDATE_GAME_RESULT,
      {
        updateGameBoardInput: {
          id: this.id,
          result: result,
        },
      }
    );
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
        new OtherBoardModel(data.id, data.rows, data.result)
    );
    console.log("heyyy: ", values);
    return values;
  }

  async checkNameAvailablity(name: string): Promise<boolean> {
    const endpoint = " https://mastermind-api.onrender.com/graphql";

    const graphQLClient = new GraphQLClient(endpoint);

    const query = gql`
      query findAllPlayerNames {
        findAllPlayerNames
      }
    `;

    const { findAllPlayerNames } = await graphQLClient.request(query);

    if (findAllPlayerNames.includes(name)) {
      return false;
    } else {
      return true;
    }
  }
}
