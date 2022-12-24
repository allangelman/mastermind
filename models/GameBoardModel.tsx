import { FeedbackModel } from "./FeedbackModel";
import { GameBoardRowModel } from "./GameBoardRowModel";
import { OptionsModel } from "./OptionsModel";

export class GameBoardModel {
  private readonly options: OptionsModel;
  readonly numSlots: number;
  currentRound: number;
  gameBoard: GameBoardRowModel[];

  constructor(
    numSlots: number,
    numRows: number,
    options: OptionsModel,
    code: number[]
  ) {
    this.numSlots = numSlots;
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
}
