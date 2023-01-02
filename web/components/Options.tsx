import { OptionsModel } from "../models/OptionsModel";

interface OptionsProps {
  optionsModel: OptionsModel;
}

export const Options = ({ optionsModel }: OptionsProps) => {
  return (
    <div className="mx-auto w-[400px]">
      <Row optionsModel={optionsModel} />
    </div>
  );
};

interface RowProps {
  optionsModel: OptionsModel;
}

export const Row = ({ optionsModel }: RowProps) => {
  return (
    <div className="flex flex-row space-x-2 justify-center">
      {optionsModel.options.map((number, i) => (
        <Slot
          key={i}
          value={number}
          onClick={() => optionsModel.setCurrentOption(number)}
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
