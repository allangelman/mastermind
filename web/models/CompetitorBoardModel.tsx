import { rowFeedbackData } from "../lib/graphQLClient";
import { CompetitorFeedbackModel } from "./CompetitorFeedbackModel";

export class CompetitorBoardModel {
  private readonly id: string;
  readonly result?: "Won" | "Lost";
  readonly rows: CompetitorFeedbackModel[];
  readonly name?: string;

  constructor(
    id: string,
    rows: rowFeedbackData[],
    name?: string,
    result?: "Won" | "Lost"
  ) {
    this.id = id;
    this.name = name;
    this.result = result;
    this.rows = rows.map(
      (feedbackData: rowFeedbackData) =>
        new CompetitorFeedbackModel(
          feedbackData.feedback.split("").map((char: string) => parseInt(char))
        )
    );
  }
}
