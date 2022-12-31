import cn from "classnames";

interface CheckButtonProps {
  rowNumber: number;
  currentRound: number;
  onClick: () => void;
  disabled: boolean;
}

export const CheckButton = ({
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
