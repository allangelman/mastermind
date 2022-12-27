import { OptionsModel } from "./OptionsModel";
import { GameBoardModel } from "./GameBoardModel";
import { v4 as uuidv4 } from "uuid";

export class GameModel {
  readonly numSlots: number;
  gameBoards: GameBoardModel[] = [];
  id: string;
  numRows: number;
  options: OptionsModel;
  code: number[];

  constructor(
    numSlots: number,
    numRows: number,
    options: OptionsModel,
    code: number[],
    id: string
  ) {
    this.numSlots = numSlots;
    this.id = id;
    this.numRows = numRows;
    this.options = options;
    this.code = code;

    this.gameBoards.push(
      new GameBoardModel(numSlots, numRows, options, code, uuidv4())
    );
  }

  addGameBoard(): void {
    this.gameBoards.push(
      new GameBoardModel(
        this.numSlots,
        this.numRows,
        this.options,
        this.code,
        uuidv4()
      )
    );
  }
}