import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FeedbackModel } from "../models/FeedbackModel";
import { GameBoardModel } from "../models/GameBoardModel";

interface GameProps {
  board: GameBoardModel;
}

export const GameBoard = ({ board }: GameProps) => {
  const [currentRound, setCurrentRound] = useState<number>(0);
  return (
    <div className="mx-auto w-[300px] bg-yellow-400 space-y-2">
      {board.getGameBoard().map((row, i) => (
        <Row
          key={i}
          rowNumber={i}
          numberPegs={row.length}
          board={board}
          round={currentRound}
          setCurrentRound={setCurrentRound}
        />
      ))}
    </div>
  );
};

interface RowProps {
  rowNumber: number;
  numberPegs: number;
  round: number;
  board: GameBoardModel;
  setCurrentRound: Dispatch<SetStateAction<number>>;
}

export const Row = ({
  board,
  numberPegs,
  rowNumber,
  round,
  setCurrentRound,
}: RowProps) => {
  const [feedback, setFeedback] = useState<FeedbackModel>();
  return (
    <div className="flex flex-row space-x-3 justify-center items-center">
      <div className="flex flex-row space-x-2 justify-center items-center">
        {Array.from(Array(numberPegs)).map((peg, i) => (
          <Slot
            key={i}
            onClick={() => {
              board.setPeg(rowNumber, i, board.options.getCurrentOption());
            }}
            value={board.getPeg(rowNumber, i)}
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
          setCurrentRound(board.getRound());
          console.log("HELLO", board.getGameBoard()[rowNumber]);
          board.setFeedback(board.getGameBoard()[rowNumber]);
          console.log("HELLO2", board.getFeedback(rowNumber));
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
  value: number;
  board: GameBoardModel;
  rowNumber: number;
  colNumber: number;
  round: number;
}

export const Slot = ({
  onClick,
  value,
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
            setSlotValue(board.getPeg(rowNumber, colNumber));
          }}
          className="w-10 h-10 flex rounded-full bg-white border-2 hover:bg-black/50 border-black"
        ></div>
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
  board,
  onClick,
  rowNumber,
  feedback,
}: FeedbackProps) => {
  const [hints, setHints] = useState<number[]>();
  // const feedbackGuesses = feedback.getFeedback();
  // console.log("feedbackGuesses: ", feedbackGuesses);

  useEffect(() => {
    if (feedback) {
      setHints(feedback.getFeedback());
    }
  }, [feedback]);

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
          className="w-20 h-10 bg-red-500"
          onClick={() => {
            onClick();
          }}
        >
          Check
        </button>
      ) : (
        <div className="w-20 h-10 bg-blue-500"></div>
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
      {number === 0 && <div className="w-2 h-2 rounded-full bg-white" />}
      {number === 1 && <div className="w-2 h-2 rounded-full bg-black" />}
      {number === 2 && <div className="w-2 h-2 rounded-full bg-red-500" />}
    </>
  );
};
