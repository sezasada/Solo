const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
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
router.post('/', rejectUnauthenticated, (req, res) => {
    const newFavorite = req.body;
    const userId = req.user.id;
    const queryText = `INSERT INTO "favorites" ("user_id", "ticker") VALUES ($1, $2)`;
    const queryValues = [userId, newFavorite.ticker];
    pool
      .query(queryText, queryValues)
      .then(() => res.sendStatus(201))
      .catch((error) => {
        console.log('Error in POST /favorites', error);
        res.sendStatus(500);
      });
  });

router.delete('/:userId/:ticker', rejectUnauthenticated, (req, res) => {
    const userId = req.params.userId;
    const ticker = req.params.ticker;
    const queryText = `
        DELETE FROM "favorites" WHERE "user_sid" = $1 AND "ticker" = $2;
    `;
    const queryValues = [userId, ticker];
    pool.query(queryText, queryValues)
        .then(() => res.sendStatus(204))
        .catch((error) => {
            console.log('Error in DELETE /favorites/:userId/:ticker', error);
            res.sendStatus(500);
        });
});


module.exports = router;
