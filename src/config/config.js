const env = process.env;
module.exports = Object.freeze({
  MYSQL_USERNAME: env.DB_USER,
  MYSQL_PASSWORD: env.DB_PASSWORD,
  SERVER_PORT:env.NODE_PORT,
  SALT_ROUND:10,
  HOST:env.DB_HOST,
  DATABASE:env.DB_NAME,
  DB_PORT:env.DB_PORT,
  S3_BUCKET_NAME:env.S3_BUCKET_NAME,
});