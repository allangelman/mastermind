import { ReactElement } from "react";
import { OptionsModel } from "../models/OptionsModel";

interface OptionsProps {
  options: OptionsModel;
}

export const Options = ({ options }: OptionsProps) => {
  return (
    <div className="mx-auto w-[400px] bg-yellow-400">
      <Row options={options} />
    </div>
  );
};

interface RowProps {
  options: OptionsModel;
}

export const Row = ({ options }: RowProps) => {
  return (
    <div className="flex flex-row space-x-2 justify-center">
      {options.getOptions().map((number, i) => (
        <Slot
          key={i}
          value={number}
          onClick={() => options.setCurrentOption(number)}
        />
      ))}
    </div>
  );
};

interface SlotProps {
  value: number;
  onClick: () => {};
}

export const Slot = ({ value, onClick }: SlotProps) => {
  return (
    <div
      onClick={onClick}
      className="w-10  h-10 rounded-full flex justify-center items-center bg-white border hover:bg-black/50 border-black"
    >
      {value}
    </div>
  );
};