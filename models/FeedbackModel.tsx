import { Options } from "next/dist/server/base-server";
import { OptionsModel } from "./OptionsModel";

export class FeedbackModel {
  feedback: number[];
  code: number[];

  constructor(guesses: number[], code: number[]) {
    this.code = code;
    this.feedback = this.feedbackFromGuesses(guesses);
  }

  private feedbackFromGuesses(guesses: number[]): number[] {
    const feedback = [0, 0, 0, 0];
    let numCorrectNumbers = 0;
    let numCorrectLocations = 0;
    let numRed = 0;
    let numBlack = 0;

    const codeDictionary: Map<number, number> = new Map([]);

    for (let i = 0; i < 4; i++) {
      const value = codeDictionary.get(this.code[i]);
      if (value) {
        codeDictionary.set(this.code[i], value + 1);
      } else {
        codeDictionary.set(this.code[i], 1);
      }
    }

    for (let i = 0; i < 4; i++) {
      const value = codeDictionary.get(guesses[i]);
      if (guesses[i] === this.code[i]) {
        numCorrectLocations += 1;
      }
      if (this.code.includes(guesses[i]) && value && value > 0) {
        numCorrectNumbers += 1;
        codeDictionary.set(guesses[i], value - 1);
      }
    }

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

  getFeedback() {
    return this.feedback;
  }
}
