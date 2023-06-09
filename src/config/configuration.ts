export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  discord: {
    token: process.env.DISCORD_TOKEN,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});
