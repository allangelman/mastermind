interface StartPageInputProps {
  label: string;
  inputValue: string;
  onChange: (e: any) => void;
}

export const StartPageInput = ({
  label,
  inputValue,
  onChange,
}: StartPageInputProps) => {
  return (
    <div className="flex flex-row justify-center items-center space-x-2">
      <div> {label}</div>
      <input
        className="w-30 h-10 rounded-lg border-2"
        value={inputValue}
        onChange={onChange}
      ></input>
    </div>
  );
};
