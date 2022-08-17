const Pool = require("pg").Pool;


require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgres://xnsvszwflrpiqc:255b51a2d41e344e27df576bd4fa167f58796dc365cf55ced46aab0205d70bbe@ec2-176-34-215-248.eu-west-1.compute.amazonaws.com:5432/dujv4j89o419o`;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pool;