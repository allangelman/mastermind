import { Dispatch, SetStateAction, useState } from "react";
import { GameBoardModel, GameResult } from "../models/GameBoardModel";
import { GameBoardRowModel } from "../models/GameBoardRowModel";
import { CheckButton } from "./CheckButton";
import { FeedbackSquare } from "./FeedbackSquare";
import { Slot } from "./Slot";

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
      <FeedbackSquare feedback={feedback} />
      <CheckButton
        rowNumber={rowModel.rowNumber}
        currentRound={currentRound}
        onClick={async () => {
          rowModel.setFeedback(rowModel.values);
          setFeedback(rowModel.feedback);
          setGameResult(board.checkGameResult(rowModel.rowNumber));
          await rowModel.saveRow();

          board.incrementRound();
          setCurrentRound(board.currentRound);
        }}
        disabled={
          board.gameResult !== undefined ||
          board.multiPlayerResult !== undefined
        }
      />
    </div>
  );
};
