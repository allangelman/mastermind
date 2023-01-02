import { FeedbackModel } from "./FeedbackModel";
import {
  createRowData,
  createRowVariables,
  CREATE_ROW,
  GQLClient,
} from "../lib/graphQLClient";

export class RowModel {
  readonly rowNumber: number;
  private readonly code: number[];
  readonly values: number[] = [];
  private feedback?: FeedbackModel;
  private readonly gameBoardId: string;

  constructor(
    numSlots: number,
    code: number[],
    rowNumber: number,
    gameBoardId: string,
    values?: number[],
    feedback?: FeedbackModel
  ) {
    this.gameBoardId = gameBoardId;
    this.code = code;
    this.rowNumber = rowNumber;

    if (feedback) {
      this.feedback = feedback;
    }
    if (values) {
      this.values = values;
    } else {
      for (let i = 0; i < numSlots; i++) {
        this.values.push(-1);
      }
    }
  }

  async saveRow(): Promise<void> {
    const gql = new GQLClient();

    await gql.request<createRowData, createRowVariables>(CREATE_ROW, {
      createGameRowInput: {
        game_board_id: this.gameBoardId,
        row_num: this.rowNumber,
        values: this.values.join(""),
        feedback: this.feedbackValues.join(""),
      },
    });
  }

  setFeedback(guesses: number[]): void {
    this.feedback = new FeedbackModel(guesses, this.code);
  }

  get feedbackValues(): number[] {
    return this.feedback?.values ?? [0, 0, 0, 0];
  }

  setSlot(col: number, value: number): void {
    this.values[col] = value;
  }

  getSlotValue(col: number): number {
    return this.values[col];
  }
}
