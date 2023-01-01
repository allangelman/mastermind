import { useEffect, useState } from "react";
import { GameBoardModel, GameResult } from "../models/GameBoardModel";
import { useRouter } from "next/router";
import { CompetitorBoardModel } from "../models/CompetitorBoardModel";
import { FeedbackSquare } from "./FeedbackSquare";
import { GameEnded } from "./GameEnded";
import { Row } from "./Row";
import { Options } from "./Options";
import useClipboard from "react-use-clipboard";
import { Rules } from "./Rules";
import { Header } from "./Header";

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

  const [competitorBoards, setCompetitorBoards] = useState<
    CompetitorBoardModel[]
  >([]);

  const [isGameCodeCopied, setGameCodeCopied] = useClipboard(board.gameId, {
    successDuration: 3000,
  });

  const router = useRouter();
  const query = router.query;

  const gameEnded = gameResult !== undefined;

  useEffect(() => {
    const startPolling = async (): Promise<void> => {
      if (query.multiplayer && !multiPlayerGameResult) {
        await pollCompetitorBoards();
      }
    };
    startPolling();
  }, []);

  const pollCompetitorBoards = async (): Promise<void> => {
    return new Promise<void>(async (resolve) => {
      const competitorBoards = await board.getCompetitorBoards();

      setCompetitorBoards(competitorBoards);

      const multiGameResult = board.getMultiPlayerGameResult();
      setMultiPlayerGameResult(multiGameResult);

      const multiplayerGameEnded = multiGameResult !== undefined;

      if (!multiplayerGameEnded) {
        setTimeout(pollCompetitorBoards, POLL_DELAY);
      } else {
        await board.updateMultiPlayerResult(multiGameResult);
        board.setMultiPlayerResult(multiGameResult);
        if (board.gameResult === undefined) {
          board.decrementRound();
          setCurrentRound(board.currentRound);
        }
        resolve();
      }
    });
  };

  return (
    <div className="flex flex-col justify-center">
      <Header isMultiplayer={!!query.multiplayer} />
      <div className="flex justify-center">{board.code}</div>
      <div className="flex justify-center">
        <Rules />
      </div>
      {query.multiplayer && (
        <div className="flex flex-row space-x-2 items-center justify-center">
          <div> Game code: {board.gameId} </div>
          <button
            className="h-10 rounded bg-green-300 px-2 hover:bg-green-500"
            onClick={() => setGameCodeCopied()}
          >
            {isGameCodeCopied ? "Copied!" : "Copy and share!"}
          </button>
        </div>
      )}
      <div className="mx-auto w-[800px] justify-center flex flex-row space-x-4">
        <div className="flex flex-col items-center space-y-2">
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
          competitorBoards.map((competitorBoard, i) => (
            <>
              <div key={`competitor-${i}`} className="flex flex-col">
                <div key={`id-${i}`}>{competitorBoard.name}</div>
                <div key={`feedback-${i}`} className="space-y-2 pt-2">
                  {competitorBoard.rows.map((competitorFeedback, i) => (
                    <FeedbackSquare
                      feedback={competitorFeedback.feedback}
                      className="items-center space-y-1 h-10"
                    />
                  ))}
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};
