import { createClient, RedisClientType } from "redis"

import { env } from "../config"

export class RedisClient {
  private client: RedisClientType | null = null

  private async init(): Promise<void> {
    this.client = createClient({
      url: env.redisUrl,
    })
    await this.client.connect()
  }

  private async getClient(): Promise<RedisClientType> {
    if (!this.client) {
      await this.init()
    }
    return this.client as RedisClientType
  }

  public async get(key: string): Promise<string> {
    const client = await this.getClient()
    const result = await client.get(key)
    return result || ""
  }

  public async set(key: string, value: string): Promise<void> {
    const client = await this.getClient()
    await client.set(key, value)
  }

  public async delete(key: string): Promise<void> {
    const client = await this.getClient()
    await client.del(key)
  }
}

export const redis = new RedisClient()
