const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const earningsRouter = require('./routes/earnings.router');
const favoritesRouter = require('./routes/favorites.router');
const marketNewsRouter = require('./routes/marketNews.router');
const openaiRouter = require('./routes/openai.router');
const cpiDataRouter = require('./routes/cpiDataRouter.router');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());


/* Routes */
app.use('/api/user', userRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/earnings', earningsRouter);
app.use('/api/marketNews', marketNewsRouter);
app.use('/api/openai', openaiRouter);
app.use('/api/cpiData', cpiDataRouter)




// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
