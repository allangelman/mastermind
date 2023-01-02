import { GetServerSideProps } from "next";
import Head from "next/head";
import { Game } from "../../components/Game";
import { OptionsModel } from "../../models/OptionsModel";
import { FeedbackModel } from "../../models/FeedbackModel";
import { RowModel } from "../../models/RowModel";
import { BoardModel, GameResult } from "../../models/BoardModel";
import {
  existingRowData,
  getBoardData,
  getBoardVariables,
  getGameData,
  getGameVariables,
  GET_BOARD,
  GET_GAME,
  GQLClient,
} from "../../lib/graphQLClient";
import { GameModel } from "../../models/GameModel";

type GamePageProps = {
  code: string;
  game_id: string;
  board_id: string;
  existingRows: existingRowData[];
  result?: GameResult | null;
  name?: string | null;
  multiplayerResult?: string;
};

export default function GamePage({
  code,
  game_id,
  board_id,
  existingRows,
  result,
  name,
  multiplayerResult,
}: GamePageProps) {
  const options = new OptionsModel(8);

  const existingRowsReady = [];
  for (let i = 0; i < existingRows.length; i++) {
    const rowData = existingRows[i];

    const values = rowData.values
      .split("")
      .map((char: string) => parseInt(char));

    const feedbackModel = new FeedbackModel(
      values,
      code.split("").map((char) => parseInt(char))
    );

    const row = new RowModel(
      4,
      code.split("").map((char) => parseInt(char)),
      i,
      board_id,
      values,
      feedbackModel
    );
    existingRowsReady.push(row);
  }

  const boardModel = new BoardModel(
    4,
    10,
    options,
    code.split("").map((char) => parseInt(char)),
    board_id,
    existingRowsReady,
    result ? result : undefined,
    name ? name : undefined
  );

  const gameModel = new GameModel(
    game_id,
    boardModel,
    multiplayerResult ? multiplayerResult : undefined
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Game game={gameModel} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  GamePageProps,
  { id: string }
> = async ({ params, query }) => {
  const gql = new GQLClient();

  const gameData = await gql.request<getGameData, getGameVariables>(GET_GAME, {
    id: params?.id ?? "",
  });

  let boardId: string | undefined;

  if (typeof query?.boardId === "string" && query.boardId) {
    boardId = query?.boardId;
  }

  const getBoardData = await gql.request<getBoardData, getBoardVariables>(
    GET_BOARD,
    {
      id: boardId ? boardId : "",
    }
  );

  return {
    props: {
      code: gameData?.findGameById.code,
      multiplayer_result: gameData.findGameById.multiplayer_result,
      game_id: params?.id ?? "",
      board_id: boardId ? boardId : "",
      existingRows: getBoardData?.findGameBoardById.rows,
      result: getBoardData?.findGameBoardById.result ?? null,
      name: getBoardData?.findGameBoardById.name ?? null,
    },
  };
};
