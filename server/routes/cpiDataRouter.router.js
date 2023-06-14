const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();
require("dotenv").config();

// route to GET all cpi data
router.get("/CpiData", (req, res) => {

    const queryText = `SELECT * FROM "CpiData";`;

    pool.query(queryText).then((response) => {
        res.send(response.rows);
    }).catch((err) => {
        console.log("error grabbing all CpiData", err);
        res.sendStatus(500);
    });
});

module.exports = router;
