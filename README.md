# ⚃ Mastermind ⚃

should explain

- how an interviewer could run your code
- document your thought process and/or code structure
- describe any creative extensions attempted or implemented

it should be clear and unambiguous in listing all the steps in

- building
- running,
- and playing the game you built (you should make no assumptions about what software the interviewer has, and err on the side of being explicit)

# How to play

To play, please visit this link: https://mastermind-olive.vercel.app/

From there you can play Mastermind or my extension, Mastermind Race.

To run my code locally, you can pull down my repo, cd into web, and do

```
npm run dev
```

to run my test cases

```
npm test
```

# Development Process

# Code Structure

## Pages

## UI (next, react)

## Models

The models are typescript classes responsible for instantiang objects and making graphql queries and mutations

- Game
- Board
- Row
- Feedback
- CompetitorBoard
- CompetitorFeedback
- Options

```mermaid
classDiagram
  direction LR
  class GameModel {
    -board : BoardModel
    -competitorBoards: CompetitorBoardModel[]
  }
  class CompetitorBoardModel{
    -feedbacks : CompetitorFeedbackModel[]
  }
  class CompetitorFeedbackModel{
    -values : number[]
  }
  class OptionsModel{
    -values : number[]
  }
  class BoardModel{
    -rows : RowModel[]
    -options : OptionsModel
  }
  class RowModel{
    -feedback : FeedbackModel
  }
  class FeedbackModel{
    -values : number[]
  }
  GameModel  --o  BoardModel
  GameModel  --o  CompetitorBoardModel
  BoardModel  --o  RowModel
  BoardModel  --o  OptionsModel
  RowModel  --o  FeedbackModel
  CompetitorBoardModel  --o  CompetitorFeedbackModel
```

## API (graphql, nest)

## DB (postgres)

# Extensions

## Persisting Game State

## Multiplayer
