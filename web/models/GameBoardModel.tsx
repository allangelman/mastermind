import { GameBoardRowModel } from "./GameBoardRowModel";
import { OptionsModel } from "./OptionsModel";
import { PlayerModel } from "./PlayerModel";
import { GraphQLClient, gql } from "graphql-request";
import { FeedbackModel } from "./FeedbackModel";

export class GameBoardModel {
  private readonly options: OptionsModel;
  readonly numSlots: number;
  currentRound: number;
  gameBoard: GameBoardRowModel[];
  id: string;
  isWon: boolean = false;
  numRows: number;
  code: number[];
  gameId: string;
  players: PlayerModel[] = [];
  existingRows: GameBoardRowModel[];

  constructor(
    numSlots: number,
    numRows: number,
    options: OptionsModel,
    code: number[],
    gameId: string,
    id: string,
    existingRows: GameBoardRowModel[]
  ) {
    this.numSlots = numSlots;
    this.id = id;
    this.code = code;
    this.gameId = gameId;
    this.numRows = numRows;
    this.options = options;
    this.currentRound = existingRows.length;
    this.gameBoard = [];
    this.existingRows = existingRows;

    for (let i = 0; i < existingRows.length; i++) {
      const row = existingRows[i];
      this.gameBoard.push(row);
    }

    for (let i = existingRows.length; i < numRows; i++) {
      const row = new GameBoardRowModel(this.numSlots, code, i, this.id);
      this.gameBoard.push(row);
    }
  }

  async loadRows() {
    const endpoint = " https://mastermind-api.onrender.com/graphql";

    const graphQLClient = new GraphQLClient(endpoint);

    const queryy = gql`
      query findGameBoardById($id: ID!) {
        findGameBoardById(id: $id) {
          rows {
            row_num
            values
            feedback
            id
          }
        }
      }
    `;

    const variables = {
      id: this.id,
    };

    const data = await graphQLClient.request(queryy, variables);
    const rowsData = data.findGameBoardById.rows;
    for (let i = 0; i < this.numRows; i++) {
      if (i < rowsData.length) {
        const rowData = rowsData[i];
        const values = rowData.values
          .split("")
          .map((char: string) => parseInt(char));
        const feedback = rowData.feedback
          .split("")
          .map((char: string) => parseInt(char));
        const feedbackModel = new FeedbackModel(this.code, feedback);
        const row = new GameBoardRowModel(
          this.numSlots,
          this.code,
          i,
          this.id,
          values,
          feedbackModel
        );
        this.gameBoard[i] = row;
      } else {
        const row = new GameBoardRowModel(this.numSlots, this.code, i, this.id);
        this.gameBoard[i] = row;
      }
    }
  }

  incrementRound(): void {
    this.currentRound += 1;
  }

  getCurrentOption(): number {
    return this.options.getCurrentOption();
  }

  checkWonState(rowNumber: number): boolean {
    const rowFeedback = this.gameBoard[rowNumber].feedback;
    const wonState = [2, 2, 2, 2];
    return rowFeedback.every((val, index) => val === wonState[index]);
  }

  addPlayer(player: PlayerModel): void {
    this.players.push(player);
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
