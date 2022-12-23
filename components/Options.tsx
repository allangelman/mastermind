import { ReactElement } from "react";

interface OptionsProps {}

export const Options = ({}: OptionsProps) => {
  return (
    <div className="mx-auto w-[400px] bg-yellow-400">
      <Row />
    </div>
  );
};

interface RowProps {}

export const Row = ({}: RowProps) => {
  return (
    <div className="flex flex-row space-x-2 justify-center">
      <Slot value={1} />
      <Slot value={2} />
      <Slot value={3} />
      <Slot value={4} />
      <Slot value={5} />
      <Slot value={6} />
      <Slot value={7} />
      <Slot value={8} />
    </div>
  );
};

interface SlotProps {
  value: number;
}

export const Slot = ({ value }: SlotProps) => {
  return (
    <div className="w-10 h-10 rounded-full flex justify-center items-center bg-white border border-black">
      {value}
    </div>
  );
};
