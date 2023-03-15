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
        const dateRanges = [
            ['2023-02-12', '2023-03-11'],
            ['2022-12-12', '2023-02-11'],
            ['2022-10-11', '2022-12-11'],
            ['2022-08-11', '2022-10-10'],
            ['2022-06-11', '2022-08-10'],
            ['2022-04-11', '2022-06-10'],
            ['2022-02-11', '2022-04-10'],
            ['2022-01-11', '2022-02-10'],
            ['2021-11-11', '2022-01-10'],
            ['2021-09-11', '2021-11-10'],
            ['2021-07-11', '2021-09-10'],
            ['2021-05-11', '2021-07-10'],
            ['2021-03-11', '2021-05-10'],
            ['2021-01-11', '2021-03-10'],
            ['2020-12-11', '2021-01-10'],
            ['2020-10-11', '2020-12-10'],
            ['2020-08-11', '2020-10-10'],
            ['2020-06-11', '2020-08-10'],
            ['2020-04-11', '2020-06-10'],
            ['2020-02-11', '2020-04-10'],
            ['2020-01-01', '2020-02-10']
        ];

        const data = [];

        for (const [fromDate, toDate] of dateRanges) {
            const response = await axios.get(
                `https://financialmodelingprep.com/api/v3/earning_calendar?from=${fromDate}&to=${toDate}&apikey=19198710f19b50ecd5513c63a590ad31`
            );
            data.push(...response.data);
        }

        res.json(data);
    } catch (error) {
        console.log('Error fetching earnings', error);
        res.status(500).send('Internal server error');
    }
});

// router.get('/earnings', async (req, res) => {
//     try {
//         const responses = await Promise.all([
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-12-12&to=2023-02-11&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-10-11&to=2022-12-11&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-08-11&to=2022-10-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-06-11&to=2022-08-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-04-11&to=2022-06-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-02-11&to=2022-04-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2021-12-11&to=2022-02-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2021-10-11&to=2021-12-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2021-08-11&to=2021-10-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2021-06-11&to=2021-08-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2021-04-11&to=2021-06-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2021-02-11&to=2021-04-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2021-01-11&to=2021-02-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2020-11-11&to=2021-01-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2020-09-11&to=2020-11-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2020-07-11&to=2020-09-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2020-05-11&to=2020-07-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2020-03-11&to=2020-05-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2020-01-11&to=2020-03-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2019-11-11&to=2020-01-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2019-09-11&to=2019-11-10&apikey=19198710f19b50ecd5513c63a590ad31'),
//             axios.get('https://financialmodelingprep.com/api/v3/earning_calendar?from=2019-07-11&to=2019-09-10&apikey=19198710f19b50ecd5513c63a590ad31'),

//         ]);
//         const data = responses.reduce((result, response) => [...result, ...response.data], []);
//         res.json(data);
//     } catch (error) {
//         console.log('Error fetching earnings', error);
//         res.status(500).send('Internal server error');
//     }
// });

router.get('/selectedPrice/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=19198710f19b50ecd5513c63a590ad31`
        );
        const data = response.data[0].price;

        res.send(`${data}`);
    } catch (error) {
        console.log('Error fetching stock price', error);
        res.status(500).send('Internal server error');
    }
});

router.get('/stockData/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=19198710f19b50ecd5513c63a590ad31`);
        const data = {
            price: response.data[0].price,
            changesPercentage: response.data[0].changesPercentage,
            name: response.data[0].name,
            yearHigh: response.data[0].yearHigh,
            yearLow: response.data[0].yearLow,
            marketCap: response.data[0].marketCap,
            earningsAnnouncement: response.data[0].earningsAnnouncement,
            volume: response.data[0].volume,
            exchange: response.data[0].exchange,
            sharesOutstanding: response.data[0].sharesOutstanding

        };
        console.log('this is data', data);
        res.send([data]); // wrap data object inside an array so that it can be used with `selectedStockData`
    } catch (error) {
        console.log('Error fetching stock data', error.message);
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});


router.get('/stockNews/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/stock_news?tickers=${symbol}&limit=50&apikey=19198710f19b50ecd5513c63a590ad31`
        );
        const data = response.data.map((article) => ({
            title: article.title,
            publishedDate: article.published_date,
            image: article.image,
            site: article.site,
            text: article.text,
            url: article.url,
        }));
        const randomIndexes = Array.from({ length: 2 }, () =>
            Math.floor(Math.random() * data.length)
        );
        const selectedNews = randomIndexes.map((index) => data[index]);
        res.send(selectedNews);
    } catch (error) {
        console.log('Error fetching stock news', error);
        res.status(500).send('Internal server error');
    }
});

router.get('/watchlist/:userId', rejectUnauthenticated, (req, res) => {
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
