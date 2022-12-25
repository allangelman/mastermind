import { Options } from "next/dist/server/base-server";
import { OptionsModel } from "./OptionsModel";

export class FeedbackModel {
  feedback: number[];
  code: number[];

  constructor(guess: number[], code: number[]) {
    this.code = code;
    this.feedback = this.feedbackFromGuess(guess);
  }

  private feedbackFromGuess(guess: number[]): number[] {
    const feedback = [0, 0, 0, 0];
    let numCorrectNumbers = 0;
    let numCorrectLocations = 0;
    let numRed = 0;
    let numBlack = 0;
    const codeMap: Map<number, number> = new Map([]);

    //intializing codeMap
    for (let i = 0; i < 4; i++) {
      const value = codeMap.get(this.code[i]);
      if (value) {
        codeMap.set(this.code[i], value + 1);
      } else {
        codeMap.set(this.code[i], 1);
      }
    }

    //calculating numCorrectLocations and numCorrectNumbers
    for (let i = 0; i < 4; i++) {
      const value = codeMap.get(guess[i]);
      if (guess[i] === this.code[i]) {
        numCorrectLocations += 1;
      }
      if (this.code.includes(guess[i]) && value && value > 0) {
        numCorrectNumbers += 1;
        codeMap.set(guess[i], value - 1);
      }
    }

    //converting numCorrectLocations and numCorrectNumbers to "black" and "red" responses
    numBlack = numCorrectLocations;
    numRed = numCorrectNumbers - numCorrectLocations;
    for (let i = 0; i < numBlack; i++) {
      feedback[i] = 2;
    }
    for (let i = numBlack; i < numBlack + numRed; i++) {
      feedback[i] = 1;
    }

    return feedback;
  }

  getFeedback(): number[] {
    return this.feedback;
  }
}
