import { GameBoardModel } from "./GameBoardModel";

export class PlayerModel {
  allGames: GameBoardModel[] = [];
  currentGame: GameBoardModel;
  id: string;
  name: string;

  constructor(id: string, name: string, currentGame: GameBoardModel) {
    this.id = id;
    this.currentGame = currentGame;
    this.name = name;
    this.allGames.push(this.currentGame);
  }
}
