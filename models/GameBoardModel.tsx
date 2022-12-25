import { FeedbackModel } from "./FeedbackModel";
import { GameBoardRowModel } from "./GameBoardRowModel";
import { OptionsModel } from "./OptionsModel";

export class GameBoardModel {
  private readonly options: OptionsModel;
  readonly numSlots: number;
  currentRound: number;
  gameBoard: GameBoardRowModel[];
  isWon: boolean = false;
  numRows: number;

  constructor(
    numSlots: number,
    numRows: number,
    options: OptionsModel,
    code: number[]
  ) {
    this.numSlots = numSlots;
    this.numRows = numRows;
    this.options = options;
    this.currentRound = 0;
    this.gameBoard = [];
    for (let i = 0; i < numRows; i++) {
      const row = new GameBoardRowModel(this.numSlots, code, i);
      this.gameBoard.push(row);
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
}
