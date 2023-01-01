import { useEffect, useState } from "react";
import { GameBoardModel, GameResult } from "../models/GameBoardModel";
import { useRouter } from "next/router";
import { OtherBoardModel } from "../models/OtherBoardModel";
import { FeedbackSquare } from "./FeedbackSquare";
import { GameEnded } from "./GameEnded";
import { Row } from "./Row";
import { Options } from "./Options";
import useClipboard from "react-use-clipboard";
import { Rules } from "./Rules";

interface GameProps {
  board: GameBoardModel;
}

const POLL_DELAY = 1000;

export const GameBoard = ({ board }: GameProps) => {
  const [currentRound, setCurrentRound] = useState<number>(board.currentRound);
  const [gameResult, setGameResult] = useState<GameResult | undefined>(
    board.gameResult
  );
  const [multiPlayerGameResult, setMultiPlayerGameResult] = useState<
    string | undefined
  >(board.multiPlayerResult);

  const [otherPlayerFeedback, setOtherPlayerFeedback] = useState<
    OtherBoardModel[]
  >([]);

  const [isGameCodeCopied, setGameCodeCopied] = useClipboard(board.gameId, {
    successDuration: 3000,
  });

  const router = useRouter();
  const query = router.query;

  const gameEnded = gameResult !== undefined;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (query.multiplayer && !multiPlayerGameResult) {
        await pollOtherPlayerBoards();
      }
    };
    fetchData();
  }, []);

  const pollOtherPlayerBoards = async (): Promise<void> => {
    return new Promise<void>(async (resolve) => {
      const otherPlayerBoards = await board.getOtherBoardFeedback();

      setOtherPlayerFeedback(otherPlayerBoards);

      const resultsMap: Map<string, GameResult | ""> = new Map([]);

      resultsMap.set(
        board.name ?? "anon", //shouldn't ever be anon
        board.gameResult ? board.gameResult : ""
      );

      otherPlayerBoards.forEach((otherBoard) => {
        resultsMap.set(
          otherBoard.name ?? "anon", //shouldn't ever be anon
          otherBoard.result ? otherBoard.result : ""
        );
      });

      let allPlayersLost = true;
      let winner;
      resultsMap.forEach((result, name) => {
        if (result !== "Lost") {
          allPlayersLost = false;
        }
        if (result === "Won") {
          winner = name;
        }
      });
      resultsMap.keys();

      const multiplayerGameEnded = winner || allPlayersLost;

      if (!multiplayerGameEnded) {
        setTimeout(pollOtherPlayerBoards, POLL_DELAY);
      } else {
        if (winner) {
          setMultiPlayerGameResult(`${winner} Won!`);
          await board.updateMultiPlayerResult(`${winner} Won!`);
        } else if (allPlayersLost) {
          setMultiPlayerGameResult(`All lost!`);
          await board.updateMultiPlayerResult(`All lost!`);
        } else {
          setMultiPlayerGameResult(undefined);
        }
        resolve();
      }
    });
  };

  return (
    <>
      <div className=" mx-auto w-[800px] justify-center flex flex-row space-x-4">
        <div className="flex flex-col items-center w-[800px] space-y-2">
          <Rules />
          {query.multiplayer && (
            <div className="flex flex-row space-x-2 items-center">
              <div> Game code: {board.gameId} </div>
              <button
                className="h-10 rounded bg-green-300 px-2 hover:bg-green-500"
                onClick={() => setGameCodeCopied()}
              >
                {isGameCodeCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
          <div>{board.name}</div>
          <div className="flex flex-col space-y-2">
            <>
              {board.gameBoard.map((rowModel, i) => (
                <Row
                  key={i}
                  rowModel={rowModel}
                  numSlots={board.numSlots}
                  board={board}
                  currentRound={currentRound}
                  setCurrentRound={setCurrentRound}
                  setGameResult={setGameResult}
                />
              ))}
            </>
          </div>
          {gameEnded && !query.multiplayer && (
            <GameEnded
              message={gameResult === "Won" ? "WON!" : "LOST :("}
              code={board.code}
            />
          )}
          {multiPlayerGameResult && (
            <GameEnded message={multiPlayerGameResult} code={board.code} />
          )}
          <Options options={board.options} />
        </div>
        {query.multiplayer &&
          otherPlayerFeedback.map((otherPlayerFeedback, i) => (
            <>
              <div className="flex flex-col">
                <div key={`id-${i}`}>{otherPlayerFeedback.name}</div>
                <div key={`feedback-${i}`} className="space-y-2 pt-2">
                  {otherPlayerFeedback.rows.map((otherPlayerFeedback, i) => (
                    <FeedbackSquare
                      feedback={otherPlayerFeedback.feedback}
                      className="items-center  space-y-1 h-10"
                    />
                  ))}
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};
