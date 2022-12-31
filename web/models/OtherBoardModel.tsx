import { rowFeedbackData } from "../lib/graphQLClient";
import { OtherFeedbackModel } from "./OtherFeedbackModel";

export class OtherBoardModel {
  id: string;
  result?: "Won" | "Lost";
  rows: OtherFeedbackModel[];
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
        new OtherFeedbackModel(
          feedbak.feedback.split("").map((char: string) => parseInt(char))
        )
    );
  }
}
