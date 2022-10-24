export default () => ({
  app: { port: parseInt(process.env.PORT, 10) || 9000 },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
