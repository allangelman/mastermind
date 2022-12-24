import { Options } from "next/dist/server/base-server";
import { OptionsModel } from "./OptionsModel";

export class FeedbackModel {
  feedback: number[];
  code: number[];

  constructor(guesses: number[], code: number[]) {
    console.log("model: ", guesses, code);
    this.code = code;
    this.feedback = this.feedbackFromGuesses(guesses);
  }

  private feedbackFromGuesses(guesses: number[]): number[] {
    const feedback = [0, 0, 0, 0];

    for (let i = 0; i < 4; i++) {
      // console.log(guesses[i], this.code[i]);
      if (guesses[i] === this.code[i]) {
        feedback[i] = 1;
      } else if (this.code.includes(guesses[i])) {
        feedback[i] = 2;
      }
    }
    return feedback;
  }

  getFeedback() {
    return this.feedback;
  }
}
