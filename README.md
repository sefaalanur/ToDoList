# ToDoList
First of all a database created from PostgreSQL with the code:

CREATE TABLE IF NOT EXISTS public.items
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.items
    OWNER to postgres;
   
To start the node.js project we write:
npm init
npm i express body-parser
npm i ejs
npm install pg
On our terminal.Then database is connected with Node.js.When we open the website we see what's in the items table on our list and we can 
add the new item on our todo list with clicking the + button and we can delete the item from our list and database by 
clicking the checkbox and it will draw through the line from list and the item will be deleted.
