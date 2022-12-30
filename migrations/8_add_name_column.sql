ALTER TABLE game_rows
DROP COLUMN values;

ALTER TABLE game_rows
ADD COLUMN values text NOT NULL;

ALTER TABLE game_rows
DROP COLUMN feedback;

ALTER TABLE game_rows
ADD COLUMN feedback text NOT NULL;

ALTER TABLE games
DROP COLUMN code;

ALTER TABLE games
ADD COLUMN code text NOT NULL;
