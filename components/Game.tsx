import { ReactElement } from "react";

interface GameProps {}

export const GameBoard = ({}: GameProps) => {
  return (
    <div className="mx-auto w-[300px] bg-yellow-400 space-y-2">
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  );
};

interface RowProps {}

export const Row = ({}: RowProps) => {
  return (
    <div className="flex flex-row space-x-6 justify-center items-center">
      <div className="flex flex-row space-x-2 justify-center items-center">
        <Slot />
        <Slot />
        <Slot />
        <Slot />
      </div>
      <Feedback />
    </div>
  );
};

interface SlotProps {}

export const Slot = ({}: SlotProps) => {
  return (
    <div className="w-10 h-10 rounded-full bg-white border-2 border-black" />
  );
};

interface FeedbackProps {}

export const Feedback = ({}: FeedbackProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex flex-row space-x-1">
        <div className="w-2 h-2 rounded-full bg-white" />
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
      <div className="flex flex-row space-x-1">
        <div className="w-2 h-2 rounded-full bg-white" />
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
    </div>
  );
};
