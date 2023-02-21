// Retrieve all favorite stocks for a user
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get('/', rejectUnauthenticated, (req, res) => {
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
            console.log('Error in GET /favorites', error);
            res.sendStatus(500);
        });
});
module.exports = router