import { Options } from "next/dist/server/base-server";
import { FeedbackModel } from "./FeedbackModel";
import { OptionsModel } from "./OptionsModel";

export class GameBoardModel {
  numPegs: number;
  numRows: number;
  currentRound: number;
  gameBoard: number[][];
  feedback: FeedbackModel[] = [];
  code: number[];
  options: OptionsModel;

  constructor(
    numPegs: number,
    numRows: number,
    options: OptionsModel,
    code: number[]
  ) {
    this.code = code;
    this.options = options;
    this.numPegs = numPegs;
    this.numRows = numRows;
    this.currentRound = 0;
    this.gameBoard = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let i = 0; i < numPegs; i++) {
        row.push(-1);
      }
      this.gameBoard.push(row);
    }
  }

  setPeg(row: number, col: number, value: number): void {
    this.gameBoard[row][col] = value;
  }

  setFeedback(guesses: number[]): void {
    console.log("guesses: ", guesses);
    this.feedback.push(new FeedbackModel(guesses, this.code));
  }

  getFeedback(row: number): FeedbackModel {
    console.log("lengthhhhh1", this.feedback);
    if (this.feedback.length > 0) {
      console.log("lengthhhhh2");
      return this.feedback[row];
    }
    return new FeedbackModel([-1, -1, -1, -1], this.code);
  }

  getPeg(row: number, col: number): number {
    return this.gameBoard[row][col];
  }

  incrementRound(): void {
    this.currentRound += 1;
  }

  getRound(): number {
    return this.currentRound;
  }

  getGameBoard(): number[][] {
    return this.gameBoard;
  }
}
