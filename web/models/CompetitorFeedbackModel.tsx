export class CompetitorFeedbackModel {
  feedback: number[];

  constructor(feedback: number[]) {
    this.feedback = feedback;
  }

  getFeedback(): number[] {
    return this.feedback;
  }
}
