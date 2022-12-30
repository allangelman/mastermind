export class OtherFeedbackModel {
  feedback: number[];

  constructor(feedback: number[]) {
    this.feedback = feedback;
  }

  getFeedback(): number[] {
    return this.feedback;
  }
}
