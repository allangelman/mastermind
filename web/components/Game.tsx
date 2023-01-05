import { useEffect, useState } from "react";
import { GameResult } from "../models/BoardModel";
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
import { StartPageSeperator } from "./StartPageSeperator";
import cn from "classnames";

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
      } else if (query.multiplayer) {
        const competitorBoards = await game.getCompetitorBoards();
        setCompetitorBoards(competitorBoards);
      }
    };
    startPolling();
  }, []);

  const pollCompetitorBoards = async (): Promise<void> => {
    return new Promise<void>(async (resolve) => {
      const competitorBoards = await game.getCompetitorBoards();

      setCompetitorBoards(competitorBoards);

      const multiPlayerResult = game.getMultiPlayerGameResult();
      setMultiPlayerGameResult(multiPlayerResult);

      const multiplayerGameEnded = multiPlayerResult !== undefined;

      if (!multiplayerGameEnded) {
        setTimeout(pollCompetitorBoards, POLL_DELAY);
      } else {
        await game.updateMultiPlayerResult(multiPlayerResult);
        if (board.result === undefined) {
          board.decrementRound();
          setCurrentRound(board.currentRound);
        }
        resolve();
      }
    });
  };

  return (
    <div className="flex flex-col">
      <div className="mx-auto">
        <div className="w-[500px] mx-auto ">
          <Header isMultiplayer={!!query.multiplayer} />
        </div>
        <div className="flex justify-center">{board.code}</div>
      </div>
      <div className="flex flex-col mx-auto border-2 rounded-lg border-blue-500 ">
        <div className="flex flex-row items-center  min-h-[120px] mx-auto p-4  space-x-2">
          {!gameEnded && !multiPlayerGameResult && (
            <>
              <Options options={board.options} />
              <Rules />
              {query.multiplayer && (
                <div className="flex flex-row space-x-2 mx-auto items-center justify-center">
                  <button
                    className={cn(
                      "h-10 w-[170px] rounded-lg bg-green-300 px-2",
                      {
                        "hover:bg-green-500": !isGameCodeCopied,
                      }
                    )}
                    onClick={() => setGameCodeCopied()}
                    disabled={isGameCodeCopied}
                  >
                    {!isGameCodeCopied
                      ? "Copy Game Code"
                      : "Copied! Now Share!"}
                  </button>
                </div>
              )}
            </>
          )}
          {gameEnded && !query.multiplayer && (
            <GameEnded
              message={gameResult === "Won" ? "WON!" : "LOST :("}
              code={board.code}
            />
          )}
          {multiPlayerGameResult && (
            <GameEnded message={multiPlayerGameResult} code={board.code} />
          )}
        </div>
        <div className="mx-auto justify-center border-t-2 min-w-[460px] border-blue-500 flex flex-row">
          <div className="flex flex-col p-4 items-center space-y-2">
            <div>{board.name}</div>
            <div className="w-[300px] flex flex-col space-y-2">
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
          </div>
          {query.multiplayer &&
            competitorBoards.map((competitorBoard, i) => (
              <div
                key={`competitor-${i}`}
                className="flex flex-col w-[120px] pt-4 items-center border-l-2 border-blue-500"
              >
                <div className="truncate w-[100px] text-center" key={`id-${i}`}>
                  {competitorBoard.name}
                </div>
                <div key={`feedback-${i}`} className="space-y-2 pt-2">
                  {competitorBoard.feedbacks.map((competitorFeedback, i) => (
                    <FeedbackSquare
                      feedback={competitorFeedback.values}
                      className="items-center space-y-1 h-10"
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
