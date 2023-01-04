import cn from "classnames";

interface FeedbackSquareProps {
  feedback: number[];
  className?: string;
}
export const FeedbackSquare = ({
  feedback,
  className,
}: FeedbackSquareProps) => {
  return (
    <div className={cn(className, "flex flex-col space-y-1")}>
      <div className="flex flex-row space-x-1">
        <FeedbackCircle number={feedback[0]} />
        <FeedbackCircle number={feedback[1]} />
      </div>
      <div className="flex flex-row space-x-1">
        <FeedbackCircle number={feedback[2]} />
        <FeedbackCircle number={feedback[3]} />
      </div>
    </div>
  );
};

interface FeedbackCircleProps {
  number: number;
}

export const FeedbackCircle = ({ number }: FeedbackCircleProps) => {
  return (
    <>
      <div
        className={cn("w-2 h-2 rounded-full border border-black", {
          "bg-slate-100": number === 0,
          "bg-red-500": number === 1,
          "bg-black": number === 2,
        })}
      />
    </>
  );
};
