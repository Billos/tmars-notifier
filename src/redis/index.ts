import { createClient, RedisClientType } from "redis"

import { env } from "../config"

export class RedisClient {
  private client: RedisClientType = null

  private async init(): Promise<void> {
    this.client = createClient({
      url: env.redisUrl,
    })
    await this.client.connect()
  }

  public async get(key: string): Promise<string> {
    if (!this.client) {
      await this.init()
    }
    const result = await this.client.get(key)
    return result as string
  }

  public async set(key: string, value: string): Promise<void> {
    if (!this.client) {
      await this.init()
    }
    await this.client.set(key, value)
  }

  public async delete(key: string): Promise<void> {
    if (!this.client) {
      await this.init()
    }
    await this.client.del(key)
  }
}

export const redis = new RedisClient()
