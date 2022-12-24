import { Options } from "next/dist/server/base-server";
import { OptionsModel } from "./OptionsModel";

export class GameBoardModel {
  numPegs: number;
  numRows: number;
  currentRound: number;
  gameBoard: number[][];
  options: OptionsModel;

  constructor(numPegs: number, numRows: number, options: OptionsModel) {
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
