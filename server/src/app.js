var express = require("express");
var cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());

const pool = new Pool({
  host: "postgres",
  user: "root",
  password: "root",
  database: "postgres",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/eiei", async (req, res) => {
    await pool.query("select * from task", (error, results) => {
    if (error) {
        
    }
    res.status(200).json(results.rows)
  });
});

app.get("/insert", async (req, res) => {
  await pool.query(`insert into task (title, status_task) values ($1, $2)`,['lili', true], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});

app.listen(8080, () => console.log(`Example app listening on port 8080!`));
