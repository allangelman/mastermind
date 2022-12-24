import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FeedbackModel } from "../models/FeedbackModel";
import { GameBoardModel } from "../models/GameBoardModel";
import cn from "classnames";

interface GameProps {
  board: GameBoardModel;
  loading?: boolean;
}

export const GameBoard = ({ board, loading }: GameProps) => {
  const [currentRound, setCurrentRound] = useState<number>(0);

  return (
    <>
      {loading ? (
        <div className="mx-auto w-[300px] space-y-2">
          {board.getGameBoard().map((row, i) => (
            <Row
              key={i}
              rowNumber={i}
              numSlots={board.numSlots}
              board={board}
              round={currentRound}
              setCurrentRound={setCurrentRound}
            />
          ))}
        </div>
      ) : (
        <div className="mx-auto w-[300px] space-y-2">
          {board.getGameBoard().map((row, i) => (
            <Row
              key={i}
              rowNumber={i}
              numSlots={board.numSlots}
              board={board}
              round={currentRound}
              setCurrentRound={setCurrentRound}
            />
          ))}
        </div>
      )}
    </>
  );
};

interface RowProps {
  rowNumber: number;
  numSlots: number;
  round: number;
  board: GameBoardModel;
  setCurrentRound: Dispatch<SetStateAction<number>>;
}

export const Row = ({
  board,
  numSlots,
  rowNumber,
  round,
  setCurrentRound,
}: RowProps) => {
  const [feedback, setFeedback] = useState<FeedbackModel>();

  return (
    <div className="flex flex-row space-x-3 justify-center items-center">
      <div className="flex flex-row space-x-2 justify-center items-center">
        {Array.from(Array(numSlots)).map((peg, i) => (
          <Slot
            key={i}
            onClick={() => {
              board.setSlot(
                rowNumber,
                i,
                board.getOptions().getCurrentOption()
              );
            }}
            board={board}
            rowNumber={rowNumber}
            colNumber={i}
            round={round}
          />
        ))}
      </div>
      <Feedback
        round={round}
        onClick={() => {
          board.incrementRound();
          setCurrentRound(board.currentRound);
          board.setFeedback(board.getGameBoardRow(rowNumber));
          setFeedback(board.getFeedback(rowNumber));
        }}
        board={board}
        rowNumber={rowNumber}
        feedback={feedback}
      />
    </div>
  );
};

interface SlotProps {
  onClick: () => void;
  board: GameBoardModel;
  rowNumber: number;
  colNumber: number;
  round: number;
}

export const Slot = ({
  onClick,
  round,
  board,
  rowNumber,
  colNumber,
}: SlotProps) => {
  const [slotValue, setSlotValue] = useState<number>(-1);

  return (
    <>
      {slotValue === -1 && round === rowNumber ? (
        <div
          onClick={() => {
            onClick();
            setSlotValue(board.getSlotValue(rowNumber, colNumber));
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
  round: number;
  board: GameBoardModel;
  onClick: () => void;
  rowNumber: number;
  feedback?: FeedbackModel;
}

export const Feedback = ({
  round,
  onClick,
  rowNumber,
  feedback,
}: FeedbackProps) => {
  const [hints, setHints] = useState<number[]>();

  useEffect(() => {
    if (feedback) {
      setHints(feedback.getFeedback());
    }
  }, [feedback]);

  console.log(hints);

  return (
    <>
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row space-x-1">
          <FeedbackCircle number={hints ? hints[0] : 0} />
          <FeedbackCircle number={hints ? hints[1] : 0} />
        </div>
        <div className="flex flex-row space-x-1">
          <FeedbackCircle number={hints ? hints[2] : 0} />
          <FeedbackCircle number={hints ? hints[3] : 0} />
        </div>
      </div>
      {rowNumber === round ? (
        <button
          className="w-20 h-10 bg-red-500 rounded-lg"
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

export const FeedbackCircle = ({ number }: FeedbackCircleProps) => {
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
