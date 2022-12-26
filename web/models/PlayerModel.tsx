import { GameBoardModel } from "./GameBoardModel";
import { GraphQLClient, gql } from "graphql-request";

interface CreatePlayerInput {
  name: string;
}

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

  async persistPlayerData(name: string) {
    const endpoint = " https://mastermind-api.onrender.com";

    const graphQLClient = new GraphQLClient(endpoint);

    const mutation = gql`
      mutation createPlayer($createPlayerInput: CreatePlayerInput!) {
        createPlayer(createPlayerInput: $createPlayerInput) {
          name
        }
      }
    `;

    const variables = {
      name,
    };

    const data = await graphQLClient.request(mutation, variables);
    console.log("data: ", data);
  }
}
