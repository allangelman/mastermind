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
} from "../lib/graphQLClient";

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
  gql: GQLClient;

  constructor(
    numSlots: number,
    numRows: number,
    options: OptionsModel,
    code: number[],
    gameId: string,
    id: string,
    existingRows: GameBoardRowModel[],
    gameResult?: GameResult
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
      const initialStatus = this.uploadStatus;
      const updateFileStatus = async (): Promise<void> => {
        const status = await this.fileService.uploadStatus(this.id);
        this.setStatus(status);
        if (status === "active") setTimeout(updateFileStatus, POLL_DELAY);
        else {
          if (status === "completed") this.store.addProcessedFiles(this.id);
          if (status === "failed" && initialStatus === "active")
            this.store.addFailedFiles(this.id);
          resolve();
        }
      };

      updateFileStatus();
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

  async getOtherBoardFeedback(boardId: string): Promise<void> {
    const getBoardData = await this.gql.request<
      getBoardData,
      getBoardVariables
    >(GET_BOARD, {
      id: boardId,
    });
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
