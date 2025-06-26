import { redis } from "../redis"
import * as Discord from "./discord"
import * as Gotify from "./gotify"
import { Notifier } from "./notifier"
import * as Ntfy from "./ntfy"

type NotificationEngine = "gotify" | "ntfy" | "discord"

export function assertNotificationEngine(notificationEngine: string): notificationEngine is NotificationEngine {
  switch (notificationEngine) {
    case "gotify":
    case "ntfy":
    case "discord":
      return true
    default:
      throw new Error(`Invalid notification engine: ${notificationEngine}`)
  }
}

function getNotifier(engine: NotificationEngine): Notifier {
  switch (engine) {
    case "gotify":
      return Gotify
    case "ntfy":
      return Ntfy
    case "discord":
      return Discord
    default:
      throw new Error(`Unknown notification engine: ${engine}`)
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

  const notifier = getNotifier(engine)
  await notifier.setEndpoint(userName, endpoint)
  await redis.set(`${engine}:${userName}`, endpoint)
}

export async function getNotificationEndpoint(userName: string): Promise<string | null> {
  const engine = await getNotificationEngine(userName)
  return redis.get(`${engine}:${userName}`)
}

export async function sendNotification(userName: string, message: string, link?: string | null) {
  const engine = await getNotificationEngine(userName)

  const notifier = getNotifier(engine)
  try {
    await notifier.sendNotification(userName, message, link)
  } catch (error) {
    console.log(`Error sending notification to ${userName} using ${engine}:`, error)
  }
}
