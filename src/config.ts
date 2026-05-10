const env = {
  port: process.env.PORT || 3000,
  tmarsUrl: process.env.TMARS_URL || "http://localhost:8080",
  tmarsToken: process.env.TMARS_TOKEN || "default",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
}

export { env }
