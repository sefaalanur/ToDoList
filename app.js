const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const items = [];
const workItems = [];

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todolistDB',
  password: 'sefa2024',
  port: 5434, // replace with your database's port number
});

async function connectToPostgres() {
  try {
    // Connect to the PostgreSQL database
    await pool.connect();
    // Access the database and tables
    console.log("connected database");

  } catch (err) {
    console.error(err);
  } finally {
    // Release the client connection

  }
}
connectToPostgres();

 app.set('view engine', 'ejs');
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(express.static("public"));

 app.get("/", function(req, res) {

  pool.query("SELECT * FROM items", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error retrieving items from database");
    }


    const items = result.rows.map((row) => row.name);
    const day = date.getDate();

    res.render("list", {

      listTitle: day,
      newListItems: items,
    });
  });
});


app.post("/", function(req,res) {
    const newItem = req.body.newItem;
    pool.query('INSERT INTO items (name) VALUES ($1)', [newItem], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('Item added to database');
      items.push(newItem);
      res.redirect("/");
    }
  });

});

app.post("/delete", function(req,res) {
    const checkedItemId = req.body.checkbox;
    pool.query('DELETE FROM items WHERE name=$1;', [checkedItemId], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('Item deleted from database');
      res.redirect("/");
    }
  });
});


  app.listen(3000, function(){
    console.log("Server started on port 3000");
  });
