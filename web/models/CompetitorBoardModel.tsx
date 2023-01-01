import { rowFeedbackData } from "../lib/graphQLClient";
import { CompetitorFeedbackModel } from "./CompetitorFeedbackModel";

export class CompetitorBoardModel {
  id: string;
  result?: "Won" | "Lost";
  rows: CompetitorFeedbackModel[];
  name?: string;

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
      (feedbak: rowFeedbackData) =>
        new CompetitorFeedbackModel(
          feedbak.feedback.split("").map((char: string) => parseInt(char))
        )
    );
  }
}
