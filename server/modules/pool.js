

const pg = require('pg');
let pool;

if (process.env.DATABASE_URL) {
    console.log('this is the .env', process.env.DATABASE_URL);
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
        
    });
    console.log('this is the .env', process.env.DATABASE_URL);
}


else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'solo-project',  
    });
}

module.exports = pool;
