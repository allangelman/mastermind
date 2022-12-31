import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Header } from "../components/Header";
import cn from "classnames";
import { GetServerSideProps } from "next";
import {
  createBoardData,
  createBoardVariables,
  createGameData,
  createGameVariables,
  CREATE_GAME,
  CREATE_GAME_BOARD,
  GQLClient,
} from "../lib/graphQLClient";

type GamePageProps = {
  code: string;
};

export default function Home({ code }: GamePageProps) {
  const router = useRouter();

  const [isStartButtonDisabled, setStartButtonDisabled] =
    useState<boolean>(true);
  const [inputNameStartValue, setInputNameStartValue] = useState<string>("");

  const [inputNameJoinValue, setInputNameJoinValue] = useState<string>("");
  const [inputGameJoinValue, setInputGameJoinValue] = useState<string>("");

  const isJoinButtonDisabled =
    inputNameJoinValue === "" || inputGameJoinValue === "";

  const gql = new GQLClient();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mx-auto w-[500px] flex flex-col items-center space-y-2">
        <button
          onClick={async () => {
            const gameData = await gql.request<
              createGameData,
              createGameVariables
            >(CREATE_GAME, { createGameInput: { code } });

            const boardData = await gql.request<
              createBoardData,
              createBoardVariables
            >(CREATE_GAME_BOARD, {
              createGameBoardInput: {
                game_id: gameData.createGame.id,
                name: inputNameStartValue,
              },
            });
            router.push(
              `/game/${gameData.createGame.id}?boardId=${boardData.createGameBoard.id}`
            );
          }}
          className={"h-10 rounded-lg px-2 bg-green-500"}
        >
          start single player
        </button>
        <div className="border w-[200px]" />
        <div className="flex flex-row justify-center items-center space-x-2">
          <div> player name</div>
          <input
            className="w-30 h-10 rounded-lg border-2"
            value={inputNameStartValue}
            onChange={(e) => {
              setInputNameStartValue(e.target.value);
              setStartButtonDisabled(e.target.value === "");
            }}
          ></input>
        </div>
        <button
          onClick={async () => {
            const gameData = await gql.request<
              createGameData,
              createGameVariables
            >(CREATE_GAME, { createGameInput: { code } });

            const boardData = await gql.request<
              createBoardData,
              createBoardVariables
            >(CREATE_GAME_BOARD, {
              createGameBoardInput: {
                game_id: gameData.createGame.id,
                name: inputNameStartValue,
              },
            });
            router.push(
              `/game/${gameData.createGame.id}?boardId=${boardData.createGameBoard.id}&multiplayer=true`
            );
          }}
          className={cn("h-10 rounded-lg px-2", {
            "bg-green-200": isStartButtonDisabled,
            "bg-green-500": !isStartButtonDisabled,
          })}
          disabled={isStartButtonDisabled}
        >
          start multi player
        </button>
        <div className="border w-[200px]" />
        <div className="flex flex-row justify-center items-center space-x-2">
          <div> player name</div>
          <input
            className="w-30 h-10 rounded-lg border-2"
            value={inputNameJoinValue}
            onChange={(e) => {
              setInputNameJoinValue(e.target.value);
            }}
          ></input>
        </div>
        <div className="flex flex-row justify-center items-center space-x-2">
          <div> game code</div>
          <input
            className="w-30 h-10 rounded-lg border-2"
            value={inputGameJoinValue}
            onChange={(e) => {
              setInputGameJoinValue(e.target.value);
            }}
          ></input>
        </div>
        <button
          onClick={async () => {
            const boardData = await gql.request<
              createBoardData,
              createBoardVariables
            >(CREATE_GAME_BOARD, {
              createGameBoardInput: {
                game_id: inputGameJoinValue,
                name: inputNameJoinValue,
              },
            });
            router.push(
              `/game/${inputGameJoinValue}?boardId=${boardData.createGameBoard.id}&multiplayer=true`
            );
          }}
          className={cn("h-10 rounded-lg px-2", {
            "bg-green-200": isJoinButtonDisabled,
            "bg-green-500": !isJoinButtonDisabled,
          })}
          disabled={isJoinButtonDisabled}
        >
          join multi player
        </button>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  GamePageProps
> = async () => {
  const response = await fetch(
    "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new"
  );
  const codeWithNewLines = await response.text();
  const codeArray = codeWithNewLines.split("\n");
  const code = codeArray.join("");

  return {
    props: {
      code: code,
    },
  };
};
