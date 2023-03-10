interface HeaderProps {
  isMultiplayer?: boolean;
}
export const Header = ({ isMultiplayer }: HeaderProps) => {
  return (
    <>
      <div className="flex justify-center w-[500px] mx-auto py-2 top-0 ">
        <div className="text-2xl">
          {isMultiplayer ? "Mastermind Race" : "Mastermind"}
        </div>
      </div>
    </>
  );
};
