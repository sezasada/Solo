const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");


router.get('/marketNews', rejectUnauthenticated, async (req, res) => {
    try {
      const response = await fetch('https://stocknewsapi.com/api/v1/category?section=general&items=3&page=1&token=9knkgcm8m9iqlnrnj0hyqumlsnpjrocziwvo31mf');
      const data = await response.json();
      res.json(data.data);
    } catch (error) {
      console.error('Error fetching API data:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


module.exports = router