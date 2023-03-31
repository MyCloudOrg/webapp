const dbconfig = require('../config/config');
const mysql = require('mysql2/promise');
const logger = require('../Logger/logger')
const { Sequelize } = require('sequelize');
module.exports = db= {};
let isInitialized= false;
db.initialize = initialize;
initialize();''
async function initialize() {
  if(isInitialized){
    return;
  }
  console.log("inside initializing")
  logger.info("Inside Initiailizing siva 1st logger")
    // create db if it doesn't already exist
    const { DB_PORT,HOST, SERVER_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, DATABASE } = dbconfig;

    const connection = await mysql.createConnection({  host: HOST,
      user: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
    port:DB_PORT});
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}\`;`);


    // connect to db
    const sequelize = new Sequelize(DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, { host: dbconfig.HOST, dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('./model')(sequelize);
    db.Product = require('./productModel')(sequelize);
    db.Image = require('./imageModel')(sequelize);
    console.log("after assigning")
    // sync all models with database
    await sequelize.sync();
    isInitialized = true;
    // console.log(await db.User.findOne({where:{id:"ASdf"}}))
}
