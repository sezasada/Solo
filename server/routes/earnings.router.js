const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const newFavorite = req.body;
    const queryText = `INSERT INTO "favorites" ("user_id", "ticker") VALUES ($1, $2)`;
    const queryValues = [newFavorite.userId, newFavorite.ticker];
    pool
        .query(queryText, queryValues)
        .then(() => res.sendStatus(201))
        .catch((error) => {
            console.log('Error in POST /favorites', error);
            res.sendStatus(500);
        });
});


module.exports = router;
