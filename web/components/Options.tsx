import { OptionsModel } from "../models/OptionsModel";
import { Rules } from "./Rules";

interface OptionsProps {
  options: OptionsModel;
}

export const Options = ({ options }: OptionsProps) => {
  const firstFour = options.values.slice(0, 4);
  const lastFour = options.values.slice(4, 8);
  return (
    <div className="flex flex-col space-y-2">
      <Row options={options} values={firstFour} />
      <Row options={options} values={lastFour} />
    </div>
  );
};

interface RowProps {
  values: number[];
  options: OptionsModel;
}

export const Row = ({ values, options }: RowProps) => {
  return (
    <div className="flex flex-row space-x-2 justify-center">
      {values.map((number, i) => (
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
      className="w-10  h-10 rounded-full flex justify-center items-center bg-white border-2 hover:bg-black/50 border-black"
    >
      {value}
    </div>
  );
};
