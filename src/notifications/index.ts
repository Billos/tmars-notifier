import { redis } from "../redis"
import * as Gotify from "./gotify"
import * as Ntfy from "./ntfy"

type NotificationEngine = "gotify" | "ntfy"

export function assertNotificationEngine(notificationEngine: string): notificationEngine is NotificationEngine {
  switch (notificationEngine) {
    case "gotify":
    case "ntfy":
      return true
    default:
      throw new Error(`Invalid notification engine: ${notificationEngine}`)
  }
}

export async function setNotificationEngine(userName: string, engine: NotificationEngine): Promise<void> {
  await redis.set(`notification:${userName}`, engine)
}

export async function getNotificationEngine(userName: string): Promise<NotificationEngine | null> {
  const value = await redis.get(`notification:${userName}`)
  return value as NotificationEngine | null
}

export async function setNotificationEndpoint(userName: string, endpoint: string): Promise<void> {
  const engine = await getNotificationEngine(userName)
  if (engine === "gotify") {
    await Gotify.setEndpoint(userName, endpoint)
  } else if (engine === "ntfy") {
    await Ntfy.setEndpoint(userName, endpoint)
  }
  await redis.set(`${engine}:${userName}`, endpoint)
}

export async function getNotificationEndpoint(userName: string): Promise<string | null> {
  const engine = await getNotificationEngine(userName)
  return redis.get(`${engine}:${userName}`)
}

export async function sendNotification(userName: string, message: string) {
  const engine = await getNotificationEngine(userName)

  if (engine === "ntfy") {
    await Ntfy.sendNotification(userName, message)
  } else if (engine === "gotify") {
    await Gotify.sendNotification(userName, message)
  }
}
