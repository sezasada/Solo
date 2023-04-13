// Retrieve all favorite stocks for a user
const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/stockData", rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const queryText = 'SELECT * FROM "favorites" WHERE "user_id" = $1;';
  const queryValues = [userId];
  pool
    .query(queryText, queryValues)
    .then(async (result) => {
      const favorites = result.rows.map((row) => {
        return row.ticker;
      });
      const apiresponses = [];
      for (let x = 0; x < favorites.length; x++) {
        const response = await axios.get(
          `https://financialmodelingprep.com/api/v3/quote/${favorites[x]}?apikey=19198710f19b50ecd5513c63a590ad31`
        );
        const data = {
          ticker: favorites[x],
          name: response.data[0].name,
          price: response.data[0].price,
          changesPercentage: response.data[0].changesPercentage,
        };
        apiresponses.push(data);
      }
      res.send(apiresponses);
    })
    .catch((error) => {
      console.log("Error in GET /favorites", error);
      res.sendStatus(500);
    });
});

router.get("/", rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const queryText = 'SELECT * FROM "favorites" WHERE "user_id" = $1;';
  const queryValues = [userId];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      const favorites = result.rows.map((row) => {
        return { ticker: row.ticker };
      });
      res.send(favorites);
    })
    .catch((error) => {
      console.log("Error in GET /favorites", error);
      res.sendStatus(500);
    });
});
router.post("/", rejectUnauthenticated, async (req, res) => {
  const input = req.body;
  const userId = req.user.id;

  try {
    const searchResponse = await axios.get(
      `https://financialmodelingprep.com/api/v3/search?query=${input.ticker}&limit=1&exchange=NASDAQ&apikey=19198710f19b50ecd5513c63a590ad31`
    );
    if (searchResponse.data.length === 0) {
      res.sendStatus("yes results found");
      return;
    }
    const symbol = searchResponse.data[0].symbol;

    const queryText = `INSERT INTO "favorites" ("user_id", "ticker") VALUES ($1, $2)`;
    const queryValues = [userId, symbol];
    await pool.query(queryText, queryValues);
    res.sendStatus(201);
  } catch (error) {
    console.log("Error in POST /favorites", error);
    res.sendStatus(500);
  }
});

router.delete("/:userId/:ticker", rejectUnauthenticated, (req, res) => {
  const userId = req.params.userId;
  const ticker = req.params.ticker;

  const queryText2 = `SELECT "user_id" FROM "favorites" WHERE "user_id"=$1 AND "ticker"=$2;`;
  pool
    .query(queryText2, [userId, ticker])
    .then((response) => {
      const itemUserId = response.rows[0].user_id;
      if (itemUserId === req.user.id) {
        const queryText = `DELETE FROM "favorites" WHERE "user_id" = $1 AND "ticker" = $2;`;
        pool
          .query(queryText, [userId, ticker])
          .then(() => res.sendStatus(204))
          .catch((error) => {
            console.log("Error in DELETE /favorites/:userId/:ticker", error);
            res.sendStatus(500);
          });
      } else {
        res.sendStatus(403);
      }
    })
    .catch((error) => {
      console.log("Error in DELETE /favorites/:userId/:ticker", error);
      res.sendStatus(500);
    });
});

module.exports = router;
