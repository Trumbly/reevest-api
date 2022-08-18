const Pool = require("pg").Pool;


require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pool;