import { FeedbackModel } from "../models/FeedbackModel";

describe("feedback 1", () => {
  test("all correct numbers", () => {
    const feedback = new FeedbackModel([1, 2, 3, 4], [1, 2, 3, 4]);
    const result = feedback.getFeedback();
    expect(result).toHaveLength(4);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(2);
    expect(result[2]).toBe(2);
    expect(result[3]).toBe(2);
  });
});

describe("feedback 2", () => {
  test("duplicate test", () => {
    const feedback = new FeedbackModel([1, 1, 3, 4], [1, 2, 6, 7]);
    const result = feedback.getFeedback();
    expect(result).toHaveLength(4);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(0);
    expect(result[2]).toBe(0);
    expect(result[3]).toBe(0);
  });
});

describe("feedback 2", () => {
  test("duplicate test 2", () => {
    const feedback = new FeedbackModel([1, 1, 1, 2], [1, 1, 2, 2]);
    const result = feedback.getFeedback();
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual([2, 2, 2, 0]);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(2);
    expect(result[2]).toBe(2);
    expect(result[3]).toBe(0);
  });
});

describe("feedback 2", () => {
  test("pdf test 1", () => {
    const feedback = new FeedbackModel([2, 2, 4, 6], [0, 1, 3, 5]);
    const result = feedback.getFeedback();
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual([0, 0, 0, 0]);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(0);
    expect(result[2]).toBe(0);
    expect(result[3]).toBe(0);
  });
});

describe("feedback 2", () => {
  test("pdf test 2", () => {
    const feedback = new FeedbackModel([0, 2, 4, 6], [0, 1, 3, 5]);
    const result = feedback.getFeedback();
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual([2, 0, 0, 0]);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(0);
    expect(result[2]).toBe(0);
    expect(result[3]).toBe(0);
  });
});

describe("feedback 2", () => {
  test("pdf test 3", () => {
    const feedback = new FeedbackModel([2, 2, 1, 1], [0, 1, 3, 5]);
    const result = feedback.getFeedback();
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual([1, 0, 0, 0]);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(0);
    expect(result[2]).toBe(0);
    expect(result[3]).toBe(0);
  });
});

describe("feedback 2", () => {
  test("pdf test 4", () => {
    const feedback = new FeedbackModel([0, 1, 5, 6], [0, 1, 3, 5]);
    const result = feedback.getFeedback();
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual([2, 2, 1, 0]);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(2);
    expect(result[2]).toBe(1);
    expect(result[3]).toBe(0);
  });
});

describe("feedback 3", () => {
  test("all correct numbers in the all the wrong positions", () => {
    const feedback = new FeedbackModel([2, 3, 4, 1], [1, 2, 3, 4]);
    const result = feedback.getFeedback();
    expect(result).toHaveLength(4);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(1);
    expect(result[3]).toBe(1);
  });
});

describe("feedback 4", () => {
  test("all incorrect numbers", () => {
    const feedback = new FeedbackModel([0, 5, 6, 7], [1, 2, 3, 4]);
    const result = feedback.getFeedback();
    expect(result).toHaveLength(4);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(0);
    expect(result[2]).toBe(0);
    expect(result[3]).toBe(0);
  });
});

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

function sum(arg0: number, arg1: number): number {
  return arg0 + arg1;
}
