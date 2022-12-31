import cn from "classnames";

interface StartPageButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  loading?: boolean;
}

export const StartPageButton = ({
  onClick,
  text,
  disabled,
  loading,
}: StartPageButtonProps) => {
  return (
    <div className="flex flex-row justify-center items-center space-x-2">
      <>
        <button
          onClick={onClick}
          className={cn("h-10 rounded-lg px-2", {
            "bg-green-200": disabled,
            "bg-green-500": !disabled,
            "animate-pulse": loading,
          })}
          disabled={disabled}
        >
          {loading ? "loading" : text}
        </button>
      </>
    </div>
  );
};
