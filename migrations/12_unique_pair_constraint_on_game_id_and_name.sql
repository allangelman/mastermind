-- This is the query I finally ran to add the unique constraint
ALTER TABLE game_boards
ADD CONSTRAINT game_boards_game_id_name_unique UNIQUE (game_id, name);

-- This is the query I ran to find and delete the game_boards in my database that violated the (game_id, name) constraint
-- I had to run this after deleting the game_rows and before enforcing the (game_id, name) constraint
DELETE FROM public.game_boards WHERE id IN (SELECT id
FROM public.game_boards t1
WHERE EXISTS (
  SELECT * FROM public.game_boards t2
  WHERE t1.game_id = t2.game_id AND t1.name = t2.name AND t1.id != t2.id
))

-- This is the query I ran to find and delete the game_rows in my database that have foriegn keys to the game_boards that violated the (game_id, name) constraint
-- I had to run this first before deleting the game_boards
DELETE FROM public.game_rows WHERE game_board_id IN (SELECT id
FROM public.game_boards t1
WHERE EXISTS (
  SELECT * FROM public.game_boards t2
  WHERE t1.game_id = t2.game_id AND t1.name = t2.name AND t1.id != t2.id
))
