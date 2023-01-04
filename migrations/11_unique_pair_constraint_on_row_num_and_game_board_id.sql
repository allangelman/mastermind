-- This is the query I ran to add the unique constraint
ALTER TABLE game_rows
ADD CONSTRAINT game_rows_game_board_id_row_num_unique UNIQUE (game_board_id, row_num);

-- This is the query I ran to find and delete the game_rows in my database that violated this constraint
-- I had to run this first before enforcing the constraint
DELETE FROM public.game_rows WHERE id IN (SELECT id
FROM public.game_rows t1
WHERE EXISTS (
  SELECT * FROM public.game_rows t2
  WHERE t1.game_board_id = t2.game_board_id AND t1.row_num = t2.row_num AND t1.id != t2.id
))
