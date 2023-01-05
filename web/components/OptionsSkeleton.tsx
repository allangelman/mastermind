export const OptionsSkeleton = () => {
  const firstFour = [0, 0, 0, 0];
  const lastFour = [0, 0, 0, 0];
  return (
    <div className="flex flex-col space-y-2">
      <RowSkeleton values={firstFour} />
      <RowSkeleton values={lastFour} />
    </div>
  );
};

interface RowProps {
  values: number[];
}

const RowSkeleton = ({ values }: RowProps) => {
  return (
    <div className="flex flex-row space-x-2 justify-center">
      {values.map((number, i) => (
        <SlotSkeleton key={i} />
      ))}
    </div>
  );
};

const SlotSkeleton = () => {
  return (
    <div className="w-10  h-10 rounded-full flex justify-center items-center bg-slate-500 animate-pulse border-2 hover:bg-black/50 border-black"></div>
  );
};
