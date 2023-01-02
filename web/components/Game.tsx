import { useEffect, useState } from "react";
import { BoardModel, GameResult } from "../models/BoardModel";
import { useRouter } from "next/router";
import { CompetitorBoardModel } from "../models/CompetitorBoardModel";
import { FeedbackSquare } from "./FeedbackSquare";
import { GameEnded } from "./GameEnded";
import { Row } from "./Row";
import { Options } from "./Options";
import useClipboard from "react-use-clipboard";
import { Rules } from "./Rules";
import { Header } from "./Header";
import { GameModel } from "../models/GameModel";

interface GameProps {
  game: GameModel;
}

const POLL_DELAY = 1000;

export const Game = ({ game }: GameProps) => {
  const board = game.board;

  const [currentRound, setCurrentRound] = useState<number>(board.currentRound);
  const [gameResult, setGameResult] = useState<GameResult | undefined>(
    board.result
  );
  const [multiPlayerGameResult, setMultiPlayerGameResult] = useState<
    string | undefined
  >(game.multiPlayerResult);

  const [competitorBoards, setCompetitorBoards] = useState<
    CompetitorBoardModel[]
  >([]);

  const [isGameCodeCopied, setGameCodeCopied] = useClipboard(game.id, {
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
      const competitorBoards = await game.getCompetitorBoards();

      setCompetitorBoards(competitorBoards);

      const multiGameResult = game.getMultiPlayerGameResult();
      setMultiPlayerGameResult(multiGameResult);

      const multiplayerGameEnded = multiGameResult !== undefined;

      if (!multiplayerGameEnded) {
        setTimeout(pollCompetitorBoards, POLL_DELAY);
      } else {
        await game.updateMultiPlayerResult(multiGameResult);
        game.setMultiPlayerResult(multiGameResult);
        if (board.result === undefined) {
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
          <div> Game code: {game.id} </div>
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
              {board.rows.map((rowModel, i) => (
                <Row
                  key={i}
                  rowModel={rowModel}
                  numSlots={board.numSlots}
                  board={board}
                  currentRound={currentRound}
                  setCurrentRound={setCurrentRound}
                  setGameResult={setGameResult}
                  disabled={
                    board.result !== undefined ||
                    game.multiPlayerResult !== undefined
                  }
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
