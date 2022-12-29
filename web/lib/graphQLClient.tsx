import {
  GraphQLClient,
  gql,
  RequestDocument,
  Variables,
} from "graphql-request";

export class GQLClient {
  private readonly gqlClient: GraphQLClient;

  constructor() {
    this.gqlClient = new GraphQLClient(
      "https://mastermind-api.onrender.com/graphql"
    );
  }

  async request<Response = any, V = Variables>(
    document: RequestDocument,
    variables?: V
  ): Promise<Response> {
    const response = await this.gqlClient.request(document, variables);
    return response;
  }
}

export const GET_GAME = gql`
  query findGameById($id: ID!) {
    findGameById(id: $id) {
      code
    }
  }
`;

export interface getGameData {
  findGameById: {
    code: string;
  };
}

export interface getGameVariables {
  id: string;
}

// not fetching feedback from db because calcuating on the client in the feedback model class
// maybe change this?
export const GET_BOARD = gql`
  query findGameBoardById($id: ID!) {
    findGameBoardById(id: $id) {
      result
      rows {
        row_num
        values
        id
      }
    }
  }
`;

export interface existingRowData {
  id: string;
  row_num: string;
  values: string;
}

export interface getBoardData {
  findGameBoardById: {
    result?: "Won" | "Lost";
    rows: existingRowData[];
  };
}

export interface getBoardVariables {
  id: string;
}

export const CREATE_GAME = gql`
  mutation createGame($createGameInput: CreateGameInput!) {
    createGame(createGameInput: $createGameInput) {
      code
      id
    }
  }
`;

export interface createGameData {
  createGame: {
    code: string;
    id: string;
  };
}

export interface createGameVariables {
  createGameInput: {
    code: string;
  };
}

export const CREATE_GAME_BOARD = gql`
  mutation createGameBoard($createGameBoardInput: CreateGameBoardInput!) {
    createGameBoard(createGameBoardInput: $createGameBoardInput) {
      id
    }
  }
`;

export interface createBoardData {
  createGameBoard: {
    code: string;
    id: string;
  };
}

export interface createBoardVariables {
  createGameBoardInput: {
    game_id: string;
  };
}

export const CREATE_ROW = gql`
  mutation createGameRow($createGameRowInput: CreateGameRowInput!) {
    createGameRow(createGameRowInput: $createGameRowInput) {
      row_num
      game_board_id
      values
      feedback
      id
    }
  }
`;

export interface createRowData {
  createGameRow: {
    row_num: number;
    game_board_id: string;
    value: string;
    feedback: string;
    id: string;
  };
}

export interface createRowVariables {
  createGameRowInput: {
    game_board_id: string;
    row_num: number;
    values: string;
    feedback: string;
  };
}

export const UPDATE_GAME_RESULT = gql`
  mutation updateGameResult($updateGameBoardInput: UpdateGameBoardInput!) {
    updateGameResult(updateGameBoardInput: $updateGameBoardInput) {
      id
      result
    }
  }
`;

export interface updateBoardResultData {
  updateGameResult: {
    result: string;
    id: string;
  };
}

export interface updateBoardResultVariables {
  updateGameBoardInput: {
    id: string;
    result: string;
  };
}
