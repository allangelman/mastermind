import { FeedbackModel } from "./FeedbackModel";
import { OptionsModel } from "./OptionsModel";

export class GameBoardModel {
  readonly numSlots: number;
  currentRound: number;
  gameBoard: number[][];
  private runningFeedback: FeedbackModel[] = [];
  private readonly code: number[];
  options: OptionsModel;

  constructor(
    numSlots: number,
    numRows: number,
    options: OptionsModel,
    code: number[]
  ) {
    this.numSlots = numSlots;
    this.code = code;
    this.options = options;
    this.currentRound = 0;
    this.gameBoard = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let i = 0; i < numSlots; i++) {
        row.push(-1);
      }
      this.gameBoard.push(row);
    }
  }

  setSlot(row: number, col: number, value: number): void {
    this.gameBoard[row][col] = value;
  }

  getSlotValue(row: number, col: number): number {
    return this.gameBoard[row][col];
  }

  setFeedback(guesses: number[]): void {
    this.runningFeedback.push(new FeedbackModel(guesses, this.code));
  }

  getFeedback(row: number): FeedbackModel {
    if (this.runningFeedback.length > 0) {
      return this.runningFeedback[row];
    }
    return new FeedbackModel([-1, -1, -1, -1], this.code);
  }

  incrementRound(): void {
    this.currentRound += 1;
  }

  getOptions(): OptionsModel {
    return this.options;
  }

  getGameBoard(): number[][] {
    return this.gameBoard;
  }

  getGameBoardRow(rowNumber: number): number[] {
    return this.gameBoard[rowNumber];
  }
}
