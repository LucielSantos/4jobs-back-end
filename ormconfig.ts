module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || '4jobs-dev',
  entities: process.env.ENVIRONMENT === 'homolog'
    ? ['./dist/models/**.js']
    : ['./src/models/**.ts'],
  migrations: process.env.ENVIRONMENT === 'homolog'
    ? ['./dist/database/migrations/**.js']
    : ['./src/database/migrations/**.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  logging: true,
}
