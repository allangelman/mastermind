import * as Dialog from "@radix-ui/react-dialog";
import { FeedbackCircle, FeedbackSquare } from "./FeedbackSquare";

export const Rules = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="h-10 w-14 flex justify-center items-center bg-blue-400 hover:bg-blue-600 rounded-lg px-2">
          Rules
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-500" />
        <Dialog.Content className="w-[600px] p-4 flex flex-col justify-center space-y-2  bg-white border-2 border-black fixed top-[5%] outline-none rounded-lg left-[30%]">
          <Dialog.Title className="flex justify-center">
            <b>Rules</b>
          </Dialog.Title>
          <Dialog.Description>
            1. A pattern of four random numbers is generated from a total of 8
            different numbers.
          </Dialog.Description>
          <Dialog.Description>
            2. A player will have 10 attempts to guess the number combination
          </Dialog.Description>
          <Dialog.Description>
            3. At the end of each guess, the computer will generate feedback
            indicating how many numbers were guessed correctly in value and how
            many were guessed correctly in value and location
          </Dialog.Description>
          <Dialog.Description>
            4. (Multiplayer only) Race the other players to crack the code
            first! You will see the feedback the other players recieve in
            real-time, so you will know how close they are to cracking the code
          </Dialog.Description>
          <Dialog.Description>
            <div className="flex flex-col items-center">
              <span>
                <b>Key</b>
              </span>
              <div className="flex flex-row space-x-4 items-center">
                <span>Incorrect number</span>
                <FeedbackCircle number={0} />
              </div>
              <div className="flex flex-row space-x-4 items-center">
                <span>Correct number</span>
                <FeedbackCircle number={1} />
              </div>
              <div className="flex flex-row space-x-4  items-center">
                <span>Correct number and location</span>
                <FeedbackCircle number={2} />
              </div>
            </div>
          </Dialog.Description>
          <Dialog.Description>
            <div className="flex flex-col items-center space-y-2">
              <span>
                <b>Examples</b>
              </span>
              <span>Code: 0 1 3 5</span>
              <div className="flex flex-row space-x-4 items-center justify-center">
                <span> Guess: 2 2 4 6</span>
                <FeedbackSquare feedback={[0, 0, 0, 0]} />
              </div>
              <div className="flex flex-row space-x-4 items-center justify-center">
                <span> Guess: 0 2 4 6</span>
                <FeedbackSquare feedback={[2, 0, 0, 0]} />
              </div>
              <div className="flex flex-row space-x-4 items-center justify-center">
                <span> Guess: 2 2 1 1</span>
                <FeedbackSquare feedback={[1, 0, 0, 0]} />
              </div>
              <div className="flex flex-row space-x-4 items-center justify-center">
                <span> Guess: 0 1 5 6</span>
                <FeedbackSquare feedback={[2, 2, 1, 0]} />
              </div>
            </div>
          </Dialog.Description>
          <Dialog.Close asChild className="flex justify-center ">
            <div className="flex">
              <div className="w-40 h-10 flex justify-center items-center bg-green-200 hover:bg-green-300 rounded-lg">
                Close Rules
              </div>
            </div>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
