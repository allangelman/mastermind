CREATE TABLE games (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  code integer[] NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON games
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE game_boards (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id uuid NOT NULL REFERENCES games (id),
  player_id uuid NOT NULL REFERENCES players (id),
  result text,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON game_boards
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


CREATE TABLE game_rows (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  row_num integer NOT NULL,
  values integer[] NOT NULL,
  feedback integer[],
  game_board_id uuid NOT NULL REFERENCES game_boards (id),
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON game_rows
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
