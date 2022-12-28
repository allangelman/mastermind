ALTER TABLE game_rows
DROP COLUMN values;

ALTER TABLE game_rows
ADD COLUMN values integer NOT NULL;

ALTER TABLE game_rows
DROP COLUMN feedback;

ALTER TABLE game_rows
ADD COLUMN feedback integer NOT NULL;
