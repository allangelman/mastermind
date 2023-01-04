import { useRouter } from "next/router";
import { FeedbackSquare } from "./FeedbackSquare";
import { Options } from "./Options";
import { Header } from "./Header";
import { OptionsModel } from "../models/OptionsModel";

interface GameSkeletonProps {
  options: OptionsModel;
}

export const GameSkeleton = ({ options }: GameSkeletonProps) => {
  const router = useRouter();
  const query = router.query;

  return (
    <div className="flex flex-col justify-center">
      <Header isMultiplayer={!!query.multiplayer} />
      <div className="flex justify-center invisible">xxxx</div>
      <div className="flex justify-center">
        <div className="h-10 w-14 flex animate-pulse bg-blue-400 rounded-lg px-2"></div>
      </div>
      {query.multiplayer && (
        <div className="flex flex-row space-x-2 items-center justify-center">
          <div className="w-[400px] h-5 rounded-lg bg-slate-400 animate-pulse" />
          <button className="h-10 rounded bg-green-300 px-2 hover:bg-green-500">
            {"Copy and share!"}
          </button>
        </div>
      )}
      <div className="mx-auto w-[800px] justify-center flex flex-row space-x-4">
        <div className="flex flex-col items-center space-y-2">
          {query.multiplayer ? (
            <div className="w-10 h-[25px] bg-slate-400 rounded-lg animate-pulse"></div>
          ) : (
            <div />
          )}
          <div className="flex flex-col space-y-2">
            <>
              {" "}
              {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </>
          </div>

          <Options options={options} />
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

interface SkeletonSlotProps {}

export const SkeletonSlot = ({}: SkeletonSlotProps) => {
  return (
    <>
      <div className="w-10 h-10 animate-pulse flex justify-center items-center rounded-full bg-slate-500 border-2 border-black"></div>
    </>
  );
};
