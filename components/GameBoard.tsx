import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GameBoardModel } from "../models/GameBoardModel";
import cn from "classnames";
import { GameBoardRowModel } from "../models/GameBoardRowModel";
import * as Dialog from "@radix-ui/react-dialog";

interface GameProps {
  board: GameBoardModel;
  loading?: boolean;
}

export const GameBoard = ({ board, loading }: GameProps) => {
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [wonState, setWonState] = useState<boolean>(false);

  const gameEnded = wonState || (!wonState && currentRound === board.numRows);

  return (
    <>
      {loading ? (
        <div className="mx-auto w-[300px] space-y-2">
          {board.gameBoard.map((rowModel, i) => (
            <Row
              key={i}
              rowModel={rowModel}
              numSlots={board.numSlots}
              board={board}
              currentRound={-1}
              setCurrentRound={setCurrentRound}
              setWonState={setWonState}
            />
          ))}
        </div>
      ) : (
        <div className="mx-auto w-[300px] space-y-2">
          {board.gameBoard.map((rowModel, i) => (
            <Row
              key={i}
              rowModel={rowModel}
              numSlots={board.numSlots}
              board={board}
              currentRound={currentRound}
              setCurrentRound={setCurrentRound}
              setWonState={setWonState}
            />
          ))}
        </div>
      )}
      <Dialog.Root open={gameEnded} onOpenChange={() => {}}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0" />
          <Dialog.Content className="w-[200px] h-[100px] flex flex-col justify-center space-y-2 items-center bg-slate-300 fixed top-[40%] outline-none rounded-lg left-[40%]">
            <Dialog.Title className="flex justify-center">
              {wonState ? "WON!" : "LOST :("}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                onClick={() => {
                  setWonState(false);
                  window.location.reload();
                }}
                className="w-40 h-10 flex justify-center items-center bg-green-200 hover:bg-green-300 rounded-lg"
              >
                Play Another Game
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

interface RowProps {
  numSlots: number;
  currentRound: number;
  rowModel: GameBoardRowModel;
  board: GameBoardModel;
  setCurrentRound: Dispatch<SetStateAction<number>>;
  setWonState: Dispatch<SetStateAction<boolean>>;
}

export const Row = ({
  board,
  numSlots,
  currentRound,
  rowModel,
  setCurrentRound,
  setWonState,
}: RowProps) => {
  const [feedback, setFeedback] = useState<number[]>();

  return (
    <div className="flex flex-row space-x-3 justify-center items-center">
      <div className="flex flex-row space-x-2 justify-center items-center">
        {Array.from(Array(numSlots)).map((peg, i) => (
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
          board.incrementRound();
          setCurrentRound(board.currentRound);
          rowModel.setFeedback(rowModel.values);
          setFeedback(rowModel.feedback);
          setWonState(board.checkWonState(rowModel.rowNumber));
        }}
        rowNumber={rowModel.rowNumber}
        feedback={feedback}
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
  const [slotValue, setSlotValue] = useState<number>(-1);

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
  feedback?: number[];
}

export const Feedback = ({
  currentRound,
  onClick,
  rowNumber,
  feedback,
}: FeedbackProps) => {
  const [populatedFeedback, setPopulatedFeedback] = useState<number[]>();

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
      />
    </>
  );
};

interface CheckButtonProps {
  rowNumber: number;
  currentRound: number;
  onClick: () => void;
}

const CheckButton = ({
  rowNumber,
  currentRound,
  onClick,
}: CheckButtonProps) => {
  return (
    <>
      {rowNumber === currentRound ? (
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
