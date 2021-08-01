var express = require("express");
var cors = require("cors");
const bp = require("body-parser");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const pool = new Pool({
  host: "postgres",
  user: "root",
  password: "root",
  database: "postgres",
  port: 5432,
});

app.get("/get/todos", async (req, res) => {
  await pool.query("select * from todo", (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).json(results.rows);
  });
});

app.get("/get/subtasks", async (req, res) => {
  const id = req.query.id ? req.query.id : null;
  if (!!id) {
    await pool.query(
      "select * from subtask where todo_id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  } else {
    res.status(200).json([]);
  }
});

app.post("/insert/todo", async (req, res) => {
  const title = req.body.title ? req.body.title : null;

  await pool.query(
    `insert into todo (title, status) values ($1, $2)`,
    [title, false],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );

  res.sendStatus(200);
});

app.post("/insert/subtasks", async (req, res) => {
  const title = req.body.title ? req.body.title : null;
  const todo_id = req.body.todo_id ? req.body.todo_id : null;

  await pool.query(
    `insert into subtask (title, todo_id, status) values ($1, $2,  $3)`,
    [title, todo_id, false],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );

  res.sendStatus(200);
});

app.listen(8080, () => console.log(`Example app listening on port 8080!`));
