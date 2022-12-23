import { ReactElement } from "react";

interface GameProps {}

export const Game = ({}: GameProps) => {
  return (
    <div className="mx-auto lg:max-w-[900px] pb-8">
      <div className="w-[900px] h-[400px] bg-yellow-300" />
    </div>
  );
};
