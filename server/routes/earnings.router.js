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
    pool
        .query(queryText, [userId])
        .then((response) => {
            if (response.rows.length > 0) {
                res.status(200).json(response.rows[0].watchlist_name);
            } else {
                res.status(404).send('Watchlist not found');
            }
        })
        .catch((error) => {
            console.log('Error in GET /watchlist/:userId', error);
            res.sendStatus(500);
        });
});
/**
 * POST route template
 */



router.put('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const watchlistName = req.body.watchlistName; // access watchlistName URL parameter
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
