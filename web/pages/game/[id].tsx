import { GetServerSideProps } from "next";
import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import { GameBoard } from "../../components/GameBoard";
import { Header } from "../../components/Header";
import { Options } from "../../components/Options";
import { GameModel } from "../../models/GameModel";
import { OptionsModel } from "../../models/OptionsModel";
import { FeedbackModel } from "../../models/FeedbackModel";
import { GameBoardRowModel } from "../../models/GameBoardRowModel";
import { GameBoardModel } from "../../models/GameBoardModel";

interface existingRowData {
  feedback: string;
  id: string;
  row_num: string;
  values: string;
}

type GamePageProps = {
  code: string;
  game_id: string;
  board_id: string;
  existingRows: existingRowData[];
};

export default function GamePage({
  code,
  game_id,
  board_id,
  existingRows,
}: GamePageProps) {
  const options = new OptionsModel(8);

  const existingRowsReady = [];
  for (let i = 0; i < existingRows.length; i++) {
    const rowData = existingRows[i];

    const values = rowData.values
      .split("")
      .map((char: string) => parseInt(char));

    const feedback = rowData.feedback
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

        <GameBoard
          game={
            new GameModel(
              4,
              10,
              options,
              code.split("").map((char) => parseInt(char)),
              game_id,
              board_id
            )
          }
          boarrdddd={
            new GameBoardModel(
              4,
              10,
              options,
              code.split("").map((char) => parseInt(char)),
              game_id,
              board_id,
              existingRowsReady
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
  const endpoint = " https://mastermind-api.onrender.com/graphql";

  const graphQLClient = new GraphQLClient(endpoint);

  const queryy = gql`
    query findGameById($id: ID!) {
      findGameById(id: $id) {
        code
        id
      }
    }
  `;

  const variables = {
    id: params?.id ?? "",
  };

  const data = await graphQLClient.request(queryy, variables);

  const queryy2 = gql`
    query findGameBoardById($id: ID!) {
      findGameBoardById(id: $id) {
        rows {
          row_num
          values
          feedback
          id
        }
      }
    }
  `;

  const variables2 = {
    id: query?.boardId,
  };

  const data2 = await graphQLClient.request(queryy2, variables2);

  return {
    props: {
      code: data.findGameById.code,
      game_id: params?.id ?? "",
      board_id: typeof query?.boardId === "string" ? query?.boardId : "",
      existingRows: data2.findGameBoardById.rows,
    },
  };
};
