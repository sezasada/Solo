const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
/**
 * GET route template
 */
router.get('/earnings', async (req, res) => {
    try {
        const responses = await Promise.all([
            axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-12-12&to=2023-02-11&apikey=19198710f19b50ecd5513c63a590ad31'),
            axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-10-11&to=2022-12-11&apikey=19198710f19b50ecd5513c63a590ad31'),
            axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-08-11&to=2022-10-10&apikey=19198710f19b50ecd5513c63a590ad31'),
            axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-06-11&to=2022-08-10&apikey=19198710f19b50ecd5513c63a590ad31'),
            axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-04-11&to=2022-06-10&apikey=19198710f19b50ecd5513c63a590ad31'),
            axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-02-11&to=2022-04-10&apikey=19198710f19b50ecd5513c63a590ad31'),
            axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2021-12-11&to=2022-02-10&apikey=19198710f19b50ecd5513c63a590ad31'),
            axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2021-10-11&to=2021-12-10&apikey=19198710f19b50ecd5513c63a590ad31'),
        ]);
        const data = responses.reduce((result, response) => [...result, ...response.data], []);
        res.json(data);
    } catch (error) {
        console.log('Error fetching earnings', error);
        res.status(500).send('Internal server error');
    }
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
