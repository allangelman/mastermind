import { GameBoardModel } from "./GameBoardModel";
import { GraphQLClient, gql } from "graphql-request";

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

  async persistPlayerData(name: string): Promise<void> {
    const endpoint = " https://mastermind-api.onrender.com/graphql";

    const graphQLClient = new GraphQLClient(endpoint);

    const mutation = gql`
      mutation createPlayer($createPlayerInput: CreatePlayerInput!) {
        createPlayer(createPlayerInput: $createPlayerInput) {
          name
        }
      }
    `;

    const variables = {
      createPlayerInput: { name },
    };

    try {
      const data = await graphQLClient.request(mutation, variables);
    } catch (error) {
      throw error;
    }
  }
}
