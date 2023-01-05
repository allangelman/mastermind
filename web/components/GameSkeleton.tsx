import { useRouter } from "next/router";
import { FeedbackSquare } from "./FeedbackSquare";
import { Header } from "./Header";
import { OptionsModel } from "../models/OptionsModel";
import cn from "classnames";
import { OptionsSkeleton } from "./OptionsSkeleton";

interface GameSkeletonProps {
  options: OptionsModel;
}

export const GameSkeleton = ({ options }: GameSkeletonProps) => {
  const router = useRouter();
  const query = router.query;

  return (
    <div className="flex flex-col">
      <div className="mx-auto">
        <div className="w-[500px] mx-auto ">
          <Header isMultiplayer={!!query.multiplayer} />
        </div>
      </div>
      <div className="flex flex-col mx-auto border-2 rounded-lg border-blue-500 ">
        <div className="flex flex-row items-center  min-h-[120px] mx-auto p-4  space-x-2">
          <>
            <OptionsSkeleton />
            <button className="h-10 w-14 flex justify-center items-center bg-blue-400 hover:bg-blue-600 animate-pulse rounded-lg px-2"></button>
            {query.multiplayer && (
              <div className="flex flex-row space-x-2 mx-auto items-center justify-center">
                <button
                  className={cn("h-10 w-[170px] rounded-lg bg-green-300 px-2")}
                ></button>
              </div>
            )}
          </>
        </div>
        <div className="mx-auto justify-center border-t-2 min-w-[460px] border-blue-500 flex flex-row">
          <div className="flex flex-col p-4 items-center space-y-2">
            {query.multiplayer && (
              <div className="w-10 h-[25px] bg-slate-500 rounded-lg"></div>
            )}
            <div className="w-[300px] flex flex-col space-y-2">
              <>
                {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_rowModel, _i) => (
                  <SkeletonRow />
                ))}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonRow = () => {
  return (
    <div className="flex flex-row space-x-3 justify-center items-center">
      <div className="flex flex-row space-x-2 justify-center items-center">
        {Array.from(Array(4)).map((_, i) => (
          <SkeletonSlot key={i} />
        ))}
      </div>
      <FeedbackSquare feedback={[0, 0, 0, 0]} />
      <div className="w-20 h-10"></div>
    </div>
  );
};

export const SkeletonSlot = () => {
  return (
    <>
      <div className="w-10 h-10 animate-pulse flex justify-center items-center rounded-full bg-slate-500 border-2 border-black"></div>
    </>
  );
};

export const GameEndedSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-[5px] bg-slate-500"></div>
      <div className="w-10 h-[5px] bg-slate-500"></div>
      <button className="w-40 h-10 flex justify-center items-center bg-green-200 hover:bg-green-300 rounded-lg"></button>
    </div>
  );
};
