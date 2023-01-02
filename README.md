# ⚃ Mastermind ⚃

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

```mermaid
sequenceDiagram
    index.tsx getServerSideProps ->>+ random.org/integers: sends request for numbers
    random.org/integers ->>+ index.tsx getServerSideProps: responds with numbers
    index.tsx getServerSideProps ->>+ index.tsx Home: passes numbers
    index.tsx Home ->>+ mastermind-api: sends requests to create game/board
    mastermind-api ->>+ index.tsx Home: responds with game/board data
    index.tsx Home ->>+ game/[id].tsx getServerSideProps: routes to
    game/[id].tsx getServerSideProps ->>+ mastermind-api: sends request to get game/board
    mastermind-api ->>+ game/[id].tsx getServerSideProps: respondes with game/board data
    game/[id].tsx getServerSideProps ->>+ game/[id].tsx GamePage: passes game/board data
```

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

```mermaid
classDiagram
direction LR
games "1" --> "*" game_boards : has
game_boards "1" --> "*" game_rows : has

    class games {
        +uuid id
        +text code
        +text? multiplayer_result
        +timestamptz created_at
    	+timestamptz updated_at
    }

    class game_boards {
    	+uuid id
        +uuid game_id
    	+text? result
    	+text? name
        +timestamptz created_at
    	+timestamptz updated_at
    }

    class game_rows {
    	+uuid id
        +uuid game_board_id
        +integer row_num
    	+text values
    	+text feedback
        +timestamptz created_at
    	+timestamptz updated_at

    }
```

# Extensions

## Persisting Game State

## Multiplayer
