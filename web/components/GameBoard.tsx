import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GameBoardModel, GameResult } from "../models/GameBoardModel";
import cn from "classnames";
import { GameBoardRowModel } from "../models/GameBoardRowModel";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { GET_OTHER_BOARDS_FEEDBACK } from "../lib/graphQLClient";
import { OtherFeedbackModel } from "../models/OtherFeedbackModel";
import { OtherBoardModel } from "../models/OtherBoardModel";

interface GameProps {
  board: GameBoardModel;
}

const POLL_DELAY = 1000;

export const GameBoard = ({ board }: GameProps) => {
  const [currentRound, setCurrentRound] = useState<number>(board.currentRound);
  const [gameResult, setGameResult] = useState<GameResult | undefined>(
    board.gameResult
  );
  const [otherPlayerFeedback, setOtherPlayerFeedback] = useState<
    OtherBoardModel[]
  >([]);
  const [alreadyStarted, setAlreadtStarted] = useState<boolean>();
  // const board = await board.getOtherBoardFeedback();
  // useEffect(() => {
  //   console.log("useEffect, ", otherPlayerFeedback);

  //   const pollOtherPlayerBoards = async (): Promise<void> => {
  //     const otherPlayerBoards = await board.getOtherBoardFeedback();
  //     // if (otherPlayerBoards.length < 1) return;
  //     // const firstPlayerBoard = otherPlayerBoards[0];
  //     // this.otherBoardData = boardONE;

  //     setOtherPlayerFeedback(otherPlayerBoards);
  //     setTimeout(pollOtherPlayerBoards, POLL_DELAY);
  //     // if (!firstPlayerBoard.result)
  //     //   setTimeout(pollOtherPlayerBoards, POLL_DELAY);
  //     // else {
  //     //   // resolve();
  //     // }
  //   };

  //   pollOtherPlayerBoards();

  //   // setOtherFeedback(board.otherBoardData?.rows ?? []);
  // }, [board, setOtherPlayerFeedback, board.otherBoardData?.rows]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const otherboards = await board.getOtherBoardFeedback();
      console.log(otherboards);
      if (otherboards.length > 0) {
        pollOtherPlayerBoards();
        setAlreadtStarted(true);
      }
    };

    fetchData();
    // if (alreadyStarted) {
    //   pollOtherPlayerBoards();
    // }
  }, []);

  const pollOtherPlayerBoards = async (): Promise<void> => {
    const otherPlayerBoards = await board.getOtherBoardFeedback();
    // if (otherPlayerBoards.length < 1) return;
    // const firstPlayerBoard = otherPlayerBoards[0];
    // this.otherBoardData = boardONE;

    setOtherPlayerFeedback(otherPlayerBoards);
    setTimeout(pollOtherPlayerBoards, POLL_DELAY);
    // if (!firstPlayerBoard.result)
    //   setTimeout(pollOtherPlayerBoards, POLL_DELAY);
    // else {
    //   // resolve();
    // }
  };

  // pollOtherPlayerBoards();

  const gameEnded = gameResult !== undefined;
  const router = useRouter();
  // console.log("HELLOOO: ", otherPlayerFeedback);
  return (
    <>
      <div className=" mx-auto w-[500px] flex flex-row space-x-4">
        <button
          onClick={() => {
            pollOtherPlayerBoards();
            setAlreadtStarted(true);
          }}
          disabled={alreadyStarted}
          className={cn("w-20 h-10", {
            "bg-green-500": !alreadyStarted,
            "bg-green-200": alreadyStarted,
          })}
        >
          start
        </button>
        <div className=" flex flex-col items-center w-[300px] space-y-4 bg-yellow-500">
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
          {gameEnded && (
            <div className="flex flex-col items-center">
              <div>{gameResult === "Won" ? "WON!" : "LOST :("}</div>
              <div>code: {board.code}</div>
              <button
                onClick={() => {
                  router.push(`/`);
                }}
                className="w-40 h-10 flex justify-center items-center bg-green-200 hover:bg-green-300 rounded-lg"
              >
                Play Another Game
              </button>
            </div>
          )}
        </div>
        {otherPlayerFeedback.map((otherPlayerFeedback, i) => (
          <>
            <div key={`id-${i}`}>{otherPlayerFeedback.id}</div>
            <div key={`feedback-${i}`} className="bg-blue-400 space-y-4">
              {otherPlayerFeedback.rows.map((otherPlayerFeedback, i) => (
                // <div>{otherPlayerFeedback.id}</div>
                <div
                  key={`individual - ${i}`}
                  className="flex flex-col space-y-1 h-10"
                >
                  <div className="flex flex-row space-x-1">
                    <FeedbackCircle number={otherPlayerFeedback.feedback[0]} />
                    <FeedbackCircle number={otherPlayerFeedback.feedback[1]} />
                  </div>
                  <div className="flex flex-row space-x-1">
                    <FeedbackCircle number={otherPlayerFeedback.feedback[2]} />
                    <FeedbackCircle number={otherPlayerFeedback.feedback[3]} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

interface RowProps {
  numSlots: number;
  currentRound: number;
  rowModel: GameBoardRowModel;
  board: GameBoardModel;
  setCurrentRound: Dispatch<SetStateAction<number>>;
  setGameResult: Dispatch<SetStateAction<GameResult | undefined>>;
}

export const Row = ({
  board,
  numSlots,
  currentRound,
  rowModel,
  setCurrentRound,
  setGameResult,
}: RowProps) => {
  const [feedback, setFeedback] = useState<number[]>(rowModel.feedback);

  return (
    <div className="flex flex-row space-x-3 justify-center items-center">
      <div className="flex flex-row space-x-2 justify-center items-center">
        {Array.from(Array(numSlots)).map((_, i) => (
          <Slot
            key={i}
            onClick={() => {
              rowModel.setSlot(i, board.getCurrentOption());
            }}
            rowModel={rowModel}
            colNumber={i}
            currentRound={currentRound}
          />
        ))}
      </div>
      <Feedback
        currentRound={currentRound}
        onClick={() => {
          rowModel.setFeedback(rowModel.values);
          setFeedback(rowModel.feedback);
          setGameResult(board.checkGameResult(rowModel.rowNumber));
          rowModel.saveRow();

          board.incrementRound();
          setCurrentRound(board.currentRound);
        }}
        rowNumber={rowModel.rowNumber}
        feedback={feedback}
        gameResult={board.gameResult}
      />
    </div>
  );
};

interface SlotProps {
  onClick: () => void;
  rowModel: GameBoardRowModel;
  colNumber: number;
  currentRound: number;
}

export const Slot = ({
  onClick,
  currentRound,
  rowModel,
  colNumber,
}: SlotProps) => {
  const [slotValue, setSlotValue] = useState<number>(
    rowModel.values[colNumber]
  );

  return (
    <>
      {slotValue === -1 && currentRound === rowModel.rowNumber ? (
        <div
          onClick={() => {
            onClick();
            setSlotValue(rowModel.getSlotValue(colNumber));
          }}
          className="w-10 h-10 flex rounded-full bg-white border-2 hover:bg-slate-300 border-black"
        ></div>
      ) : slotValue === -1 ? (
        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-slate-500 border-2 border-black"></div>
      ) : (
        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-white border-2 border-black">
          {slotValue}
        </div>
      )}
    </>
  );
};

interface FeedbackProps {
  currentRound: number;
  onClick: () => void;
  rowNumber: number;
  feedback: number[];
  gameResult?: GameResult;
}

export const Feedback = ({
  currentRound,
  onClick,
  rowNumber,
  feedback,
  gameResult,
}: FeedbackProps) => {
  const [populatedFeedback, setPopulatedFeedback] =
    useState<number[]>(feedback);

  useEffect(() => {
    if (feedback) {
      setPopulatedFeedback(feedback);
    }
  }, [feedback]);

  return (
    <>
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row space-x-1">
          <FeedbackCircle
            number={populatedFeedback ? populatedFeedback[0] : 0}
          />
          <FeedbackCircle
            number={populatedFeedback ? populatedFeedback[1] : 0}
          />
        </div>
        <div className="flex flex-row space-x-1">
          <FeedbackCircle
            number={populatedFeedback ? populatedFeedback[2] : 0}
          />
          <FeedbackCircle
            number={populatedFeedback ? populatedFeedback[3] : 0}
          />
        </div>
      </div>
      <CheckButton
        rowNumber={rowNumber}
        currentRound={currentRound}
        onClick={onClick}
        disabled={gameResult !== undefined}
      />
    </>
  );
};

interface CheckButtonProps {
  rowNumber: number;
  currentRound: number;
  onClick: () => void;
  disabled: boolean;
}

const CheckButton = ({
  rowNumber,
  currentRound,
  onClick,
  disabled,
}: CheckButtonProps) => {
  return (
    <>
      {rowNumber === currentRound ? (
        <button
          disabled={disabled}
          className={cn("w-20 h-10 rounded-lg", {
            "bg-red-400 hover:bg-red-600": !disabled,
            "bg-red-300": disabled,
          })}
          onClick={() => {
            onClick();
          }}
        >
          Check
        </button>
      ) : (
        <div className="w-20 h-10"></div>
      )}
    </>
  );
};

interface FeedbackCircleProps {
  number: number;
}

const FeedbackCircle = ({ number }: FeedbackCircleProps) => {
  return (
    <>
      <div
        className={cn("w-2 h-2 rounded-full", {
          "bg-slate-300": number === 0,
          "bg-red-500": number === 1,
          "bg-black": number === 2,
        })}
      />
    </>
  );
};
