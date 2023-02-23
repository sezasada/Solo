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
router.get('/:userId', rejectUnauthenticated, (req, res) => {
    const userId = req.params.userId;
    const queryText = `SELECT watchlist_name FROM "user" WHERE "id" = $1;`;
  
    pool.query(queryText, [userId])
      .then(response => {
        res.status(200).json(response.rows[0]);
      })
      .catch(error => {
        console.log('Error in GET /watchlist/:userId', error);
        res.sendStatus(500);
      });
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

    const queryText2 = `SELECT "user_id" FROM "favorites" WHERE "user_id"=$1 AND "ticker"=$2;`;
    pool.query(queryText2, [userId, ticker])
        .then(response => {
            const itemUserId = response.rows[0].user_id;
            if (itemUserId === req.user.id) {
                const queryText = `DELETE FROM "favorites" WHERE "user_id" = $1 AND "ticker" = $2;`;
                pool.query(queryText, [userId, ticker])
                    .then(() => res.sendStatus(204))
                    .catch((error) => {
                        console.log('Error in DELETE /favorites/:userId/:ticker', error);
                        res.sendStatus(500);
                    })
            } else {
                res.sendStatus(403);
            }
        })
        .catch((error) => {
            console.log('Error in DELETE /favorites/:userId/:ticker', error);
            res.sendStatus(500);
        });
});
router.put('/:userId', rejectUnauthenticated, (req, res) => {
    const userId = req.params.userId;
    const watchlistName = req.query.watchlistName; // access watchlistName query parameter
    const queryText = 'UPDATE "user" SET "watchlist_name" = $1 WHERE "id" = $2;';
    pool
        .query(queryText, [watchlistName, userId])
        .then(() => res.sendStatus(200))
        .catch((error) => {
            console.log('Error updating watchlist name in database', error);
            res.sendStatus(500);
        });
});
module.exports = router;
