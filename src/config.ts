const env = {
  port: process.env.PORT || 3000,
  tmarsUrl: process.env.TMARS_URL,
  tmarsToken: process.env.TMARS_TOKEN,
  redisUrl: process.env.REDIS_URL,
}

export { env }
