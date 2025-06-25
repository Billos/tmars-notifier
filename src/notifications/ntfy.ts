import { redis } from "../redis"

export async function setEndpoint(userName: string, endpoint: string): Promise<void> {
  await redis.set(`ntfy:${userName}`, endpoint)
}

export async function getEndpoint(userName: string): Promise<string | null> {
  return redis.get(`ntfy:${userName}`)
}

export async function sendNotification(userName: string, message: string): Promise<void> {
  const endpoint = await getEndpoint(userName)
  if (!endpoint) {
    return
  }
  await fetch(endpoint, {
    method: "POST",
    body: message,
  })
}
