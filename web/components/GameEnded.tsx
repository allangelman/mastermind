import { useRouter } from "next/router";

interface GameEndedProps {
  message: string;
  code: number[];
}
export const GameEnded = ({ message, code }: GameEndedProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <div>{message}</div>
      <div>code: {code}</div>
      <button
        onClick={() => {
          router.push(`/`);
        }}
        className="w-40 h-10 flex justify-center items-center bg-green-200 hover:bg-green-300 rounded-lg"
      >
        Play Another Game
      </button>
    </div>
  );
};
