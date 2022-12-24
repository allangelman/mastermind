import { FeedbackModel } from "./FeedbackModel";

export class GameBoardRowModel {
  rowNumber: number;
  code: number[];
  values: number[] = [];
  feedbackModel?: FeedbackModel;

  constructor(numSlots: number, code: number[], rowNumber: number) {
    this.code = code;
    this.rowNumber = rowNumber;
    for (let i = 0; i < numSlots; i++) {
      this.values.push(-1);
    }
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
