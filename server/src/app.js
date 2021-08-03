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

// Get Todo
app.get("/get/todos", async (req, res) => {
  await pool.query(
    "select * from todo order by created_at DESC",
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
});

// Insert Todo
app.post("/insert/todo", async (req, res) => {
  const title = req.body.title ? req.body.title : null;

  await pool.query(
    `insert into todo (title,status) values ($1,$2)`,
    [title, "pending"],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );

  res.sendStatus(200);
});

// Get Subtask Where Todo id
app.get("/get/subtasks", async (req, res) => {
  const id = req.query.id ? req.query.id : null;
  if (!!id) {
    await pool.query(
      "select * from subtask where todo_id = $1 order by created_at DESC",
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

//Insert subtasks
app.post("/insert/subtask", async (req, res) => {
  const title = req.body.title ? req.body.title : null;
  const todo_id = req.body.todo_id ? req.body.todo_id : null;

  if (!!title && !!todo_id) {
    await pool.query(
      `insert into subtask (title, todo_id, status) values ($1, $2,  $3)`,
      [title, todo_id, "pending"],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
  }

  res.sendStatus(200);
});

//Update subtasks
app.put("/update/subtask_status", async (req, res) => {
  const id = !!req.body.id ? req.body.id : null;
  const status = !!req.body.status ? req.body.status : null;

  if (!!id && (status === "pending" || status === "completed")) {
    await pool.query(
      `update subtask set status = $1 where id = $2`,
      [status, id],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
  }

  res.sendStatus(200);
});

app.listen(8080, () => console.log(`Example app listening on port 8080!`));
