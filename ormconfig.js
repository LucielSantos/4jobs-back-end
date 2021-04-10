module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || '4jobs-dev',
  entities: [
    `./src/models/**.${process.env.ENVIRONMENT === 'homolog' ? 'js' : 'ts'}`,
  ],
  migrations: [
    `./src/database/migrations/**.${process.env.ENVIRONMENT === 'homolog' ? 'js' : 'ts'}`,
  ],
  cli: {
    migrationsDir: './src/database/migrations',
  },
}
