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
  private readonly gql: GQLClient;

  constructor(
    numSlots: number,
    code: number[],
    rowNumber: number,
    gameBoardId: string,
    values?: number[],
    feedback?: FeedbackModel
  ) {
    this.gql = new GQLClient();
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
    // This is a slightly unideal fix for an issue I noticed where I was saving -1's
    // into the databse if one of the slots in the row was unfilled
    // Upon reload, the string from the database would not get parased correctly on the client
    // since the client logic splits the string by "" and does parseInt

    // As a temporary fix, I save an 8 to the database for an unfilled slot and account for that in Slot.tsx
    // A potentially better fix would be to prevent submitted rows with unfilled slots entirley on the frontend
    const values = this.values.map((value) => {
      if (value === -1) {
        return 8;
      } else {
        return value;
      }
    });

    try {
      await this.gql.request<createRowData, createRowVariables>(CREATE_ROW, {
        createGameRowInput: {
          game_board_id: this.gameBoardId,
          row_num: this.rowNumber,
          values: values.join(""),
          feedback: this.feedbackValues.join(""),
        },
      });
    } catch (error) {
      throw new Error();
    }
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
