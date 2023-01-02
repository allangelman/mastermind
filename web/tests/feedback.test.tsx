import { FeedbackModel } from "../models/FeedbackModel";

describe("test1", () => {
  test("all correct", () => {
    const feedbackModel = new FeedbackModel([1, 2, 3, 4], [1, 2, 3, 4]);
    const result = feedbackModel.values;
    expect(result).toHaveLength(4);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(2);
    expect(result[2]).toBe(2);
    expect(result[3]).toBe(2);
  });
});

describe("test2", () => {
  test("one correct location and number", () => {
    const feedbackModel = new FeedbackModel([1, 1, 3, 4], [1, 2, 6, 7]);
    const result = feedbackModel.values;
    expect(result).toHaveLength(4);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(0);
    expect(result[2]).toBe(0);
    expect(result[3]).toBe(0);
  });
});

describe("test3", () => {
  test("three correct location and number", () => {
    const feedbackModel = new FeedbackModel([1, 1, 1, 2], [1, 1, 2, 2]);
    const result = feedbackModel.values;
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual([2, 2, 2, 0]);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(2);
    expect(result[2]).toBe(2);
    expect(result[3]).toBe(0);
  });
});

describe("test4", () => {
  test("example from pdf 1", () => {
    const feedbackModel = new FeedbackModel([2, 2, 4, 6], [0, 1, 3, 5]);
    const result = feedbackModel.values;
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual([0, 0, 0, 0]);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(0);
    expect(result[2]).toBe(0);
    expect(result[3]).toBe(0);
  });
});

describe("test5", () => {
  test("example from pdf 2", () => {
    const feedbackModel = new FeedbackModel([0, 2, 4, 6], [0, 1, 3, 5]);
    const result = feedbackModel.values;
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual([2, 0, 0, 0]);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(0);
    expect(result[2]).toBe(0);
    expect(result[3]).toBe(0);
  });
});

describe("test6", () => {
  test("example from pdf 3", () => {
    const feedbackModel = new FeedbackModel([2, 2, 1, 1], [0, 1, 3, 5]);
    const result = feedbackModel.values;
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual([1, 0, 0, 0]);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(0);
    expect(result[2]).toBe(0);
    expect(result[3]).toBe(0);
  });
});

describe("test7", () => {
  test("example from pdf 4", () => {
    const feedbackModel = new FeedbackModel([0, 1, 5, 6], [0, 1, 3, 5]);
    const result = feedbackModel.values;
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual([2, 2, 1, 0]);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(2);
    expect(result[2]).toBe(1);
    expect(result[3]).toBe(0);
  });
});

describe("test8", () => {
  test("all correct in wrong position", () => {
    const feedbackModel = new FeedbackModel([2, 3, 4, 1], [1, 2, 3, 4]);
    const result = feedbackModel.values;
    expect(result).toHaveLength(4);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(1);
    expect(result[3]).toBe(1);
  });
});

describe("test9", () => {
  test("all incorrect numbers", () => {
    const feedbackModel = new FeedbackModel([0, 5, 6, 7], [1, 2, 3, 4]);
    const result = feedbackModel.values;
    expect(result).toHaveLength(4);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(0);
    expect(result[2]).toBe(0);
    expect(result[3]).toBe(0);
  });
});

describe("test10", () => {
  test("ran into issue with this case while testing", () => {
    const feedbackModel = new FeedbackModel([5, 7, 7, 5], [6, 6, 5, 7]);
    const result = feedbackModel.values;
    expect(result).toHaveLength(4);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(0);
    expect(result[3]).toBe(0);
  });
});

describe("sum test", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

function sum(arg0: number, arg1: number): number {
  return arg0 + arg1;
}
