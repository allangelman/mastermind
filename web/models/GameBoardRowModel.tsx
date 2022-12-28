import { FeedbackModel } from "./FeedbackModel";
import { GraphQLClient, gql } from "graphql-request";

export class GameBoardRowModel {
  rowNumber: number;
  code: number[];
  values: number[] = [];
  feedbackModel?: FeedbackModel;
  gameBoardId: string;

  constructor(
    numSlots: number,
    code: number[],
    rowNumber: number,
    gameBoardId: string
  ) {
    this.gameBoardId = gameBoardId;
    this.code = code;
    this.rowNumber = rowNumber;
    for (let i = 0; i < numSlots; i++) {
      this.values.push(-1);
    }
  }

  async saveRow(): Promise<void> {
    const endpoint = " https://mastermind-api.onrender.com/graphql";

    const graphQLClient = new GraphQLClient(endpoint);

    const mutation = gql`
      mutation createGameRow($createGameRowInput: CreateGameRowInput!) {
        createGameRow(createGameRowInput: $createGameRowInput) {
          row_num
          game_board_id
          values
          feedback
          id
        }
      }
    `;

    const variables = {
      createGameRowInput: {
        game_board_id: this.gameBoardId,
        row_num: this.rowNumber,
        values: this.values.join(""),
        feedback: this.feedback.join(""),
      },
    };

    const data = await graphQLClient.request(mutation, variables);
    console.log("ROWDATA: ", data);
  }

  setFeedback(guesses: number[]): void {
    this.feedbackModel = new FeedbackModel(guesses, this.code);
  }

  get feedback(): number[] {
    return this.feedbackModel?.getFeedback() ?? [0, 0, 0, 0];
  }

  setSlot(col: number, value: number): void {
    this.values[col] = value;
  }

  getSlotValue(col: number): number {
    return this.values[col];
  }
}
