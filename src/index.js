const server = require("./server.js");
const logger = require('./Logger/logger');
const CONFIG = require('./config/config');
logger.info("Please here me in index.js")
server.use((err, req, res, next) => {
    logger.error(err.stack);
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send({'error':'Bad Request'});
  })
  server.listen(CONFIG.SERVER_PORT,()=>{
    logger.info("server started at port: ",CONFIG.SERVER_PORT);
  });

process.on('uncaughtException', function(ex) {
  logger.info("server crash triggered");
  logger.info(ex);
});