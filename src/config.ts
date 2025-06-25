const env = {
  port: process.env.PORT || 3000,
  gotifyUrl: process.env.GOTIFY_URL,
  gotifyAdminToken: process.env.GOTIFY_ADMIN_TOKEN,
  gotifyDefaultPassword: process.env.GOTIFY_DEFAULT_PASSWORD || "default",
  gotifyApplicationName: process.env.GOTIFY_APPLICATION_NAME || "tmars",
  tmarsUrl: process.env.TMARS_URL,
  tmarsToken: process.env.TMARS_TOKEN,
  redisUrl: process.env.REDIS_URL,
}

export { env }
