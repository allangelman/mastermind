import { Dispatch, SetStateAction, useState } from "react";
import { BoardModel, GameResult } from "../models/BoardModel";
import { RowModel } from "../models/RowModel";
import { CheckButton } from "./CheckButton";
import { FeedbackSquare } from "./FeedbackSquare";
import { Slot } from "./Slot";

interface RowProps {
  numSlots: number;
  currentRound: number;
  rowModel: RowModel;
  board: BoardModel;
  disabled: boolean;
  setCurrentRound: Dispatch<SetStateAction<number>>;
  setGameResult: Dispatch<SetStateAction<GameResult | undefined>>;
}

export const Row = ({
  board,
  numSlots,
  currentRound,
  rowModel,
  disabled,
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
          setGameResult(board.getResult(rowModel.rowNumber));
          await rowModel.saveRow();

          board.incrementRound();
          setCurrentRound(board.currentRound);
        }}
        disabled={disabled}
      />
    </div>
  );
};
