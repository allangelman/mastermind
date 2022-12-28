import { GameBoardRowModel } from "./GameBoardRowModel";
import { OptionsModel } from "./OptionsModel";
import { PlayerModel } from "./PlayerModel";
import { GraphQLClient, gql } from "graphql-request";

export class GameBoardModel {
  private readonly options: OptionsModel;
  readonly numSlots: number;
  currentRound: number;
  gameBoard: GameBoardRowModel[];
  id: string;
  isWon: boolean = false;
  numRows: number;
  gameId: string;
  players: PlayerModel[] = [];

  constructor(
    numSlots: number,
    numRows: number,
    options: OptionsModel,
    code: number[],
    gameId: string,
    id: string
  ) {
    this.numSlots = numSlots;
    this.id = id;
    this.gameId = gameId;
    this.numRows = numRows;
    this.options = options;
    this.currentRound = 0;
    this.gameBoard = [];

    for (let i = 0; i < numRows; i++) {
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
          row {
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
    console.log(data);
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
