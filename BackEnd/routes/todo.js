const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

router.use(express.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todoapp",
});

router.get("/", (req, res) => {
  var query = "SELECT *FROM todos ORDER BY ID Desc";
  conn.query(query, (err, data) => {
    if (err)
      return res.json({
        error: err.sqlMessage,
        status: false,
        code: err.code,
      });
    return res.json({
      status: true,
      data: data,
    });
  });
});

router.post("/new", (req, res) => {
  var query = "INSERT INTO todos(`Task`,`Complete`) VALUES(?,?)";
  conn.query(query, [req.body.task, req.body.complete], (err, data) => {
    if (err)
      return res.status(500).json({
        message: "Error occured",
        err: err.sqlMessage,
        code: err.code,
      });

    return res.json({
      message: "Todo Was Successfully Added",
      status: true,
    });
  });
});

router
  .route("/:id")
  .get((req, res) => {})
  .put((req, res) => {
    var quey = "UPDATE todos set Complete=? WHERE ID=?";
    conn.query(quey, [req.body.completed, req.params.id], (err, data) => {
      if (err)
        return res.status(500).json({
          message: "error occured",
          error: err.sqlMessage,
          code: err.code,
        });

      return res.json({
        message: "Todo has been updated",
        status: true,
      });
    });
  })
  .delete((req, res) => {
    var quey = "DELETE FROM todos WHERE ID=?";
    conn.query(quey, [req.params.id], (err, data) => {
      if (err)
        return res.status(500).json({
          message: "error occured",
          error: err.sqlMessage,
          code: err.code,
        });

      return res.json({
        message: "Todo has been Deleted",
        status: true,
      });
    });
  });

module.exports = router;
