import { GetServerSideProps } from "next";
import Head from "next/head";
import { GameBoard } from "../../components/GameBoard";
import { Header } from "../../components/Header";
import { Options } from "../../components/Options";
import { OptionsModel } from "../../models/OptionsModel";
import { FeedbackModel } from "../../models/FeedbackModel";
import { GameBoardRowModel } from "../../models/GameBoardRowModel";
import { GameBoardModel, GameResult } from "../../models/GameBoardModel";
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
import { useEffect, useState } from "react";
import io from "socket.io-client";
let socket: any;

type GamePageProps = {
  code: string;
  game_id: string;
  board_id: string;
  existingRows: existingRowData[];
  result?: GameResult;
};

export default function GamePage({
  code,
  game_id,
  board_id,
  existingRows,
  result,
}: GamePageProps) {
  const options = new OptionsModel(8);

  const [input, setInput] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg: any) => {
      setInput(msg);
    });
  };

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

    const row = new GameBoardRowModel(
      4,
      code.split("").map((char) => parseInt(char)),
      i,
      board_id,
      values,
      feedbackModel
    );
    existingRowsReady.push(row);
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mx-auto w-[500px] space-y-2">
        <div className="flex justify-center">{code}</div>
        <input
          placeholder="Type something"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            socket.emit("input-change", e.target.value);
          }}
        />
        <GameBoard
          board={
            new GameBoardModel(
              4,
              10,
              options,
              code.split("").map((char) => parseInt(char)),
              game_id,
              board_id,
              existingRowsReady,
              result ? result : undefined
            )
          }
        />
        <Options options={options} />
      </div>
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

  const boardData = await gql.request<getBoardData, getBoardVariables>(
    GET_BOARD,
    {
      id: typeof query?.boardId === "string" ? query?.boardId : "",
    }
  );
  console.log(boardData);

  return {
    props: {
      code: gameData?.findGameById.code,
      game_id: params?.id ?? "",
      board_id: typeof query?.boardId === "string" ? query?.boardId : "",
      existingRows: boardData?.findGameBoardById.rows,
      result: boardData?.findGameBoardById.result,
    },
  };
};
