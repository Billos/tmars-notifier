import { env } from "../config"
import { sendNotification } from "../notifications"
import { redis } from "../redis"
import { TmarsApi } from "../tmars"
import { SimplePlayerModel } from "../tmars/types/SimpleGameModel"

const playerIntervals = new Map<string, NodeJS.Timeout>()

const tmarsApi = new TmarsApi()

export async function startPlayerRoutine(user: SimplePlayerModel) {
  if (playerIntervals.has(user.id)) {
    return
  }
  console.log(`Starting player routine for ${user.name} (${user.id})`)
  const interval = setInterval(async () => checkPlayer(user), 5000)
  playerIntervals.set(user.id, interval)
}

export async function clearPlayer(user: SimplePlayerModel) {
  console.log(`Clearing player ${user.name} (${user.id})`)
  const interval = playerIntervals.get(user.id)
  if (interval) {
    clearInterval(interval)
    playerIntervals.delete(user.id)
  }
  // Unset the redis status for the player
  console.log(`Removing status for user ${user.name} (${user.id})`)
  await redis.delete(`tmars:${user.id}:status`)
}

async function checkPlayer(user: SimplePlayerModel) {
  // console.log(`Checking player ${user.name} (${user.id})`)
  const currentStatus = await redis.get(`tmars:${user.id}:status`)
  try {
    const { result } = await tmarsApi.waitingFor(user.id)
    if (currentStatus !== result) {
      await redis.set(`tmars:${user.id}:status`, result)
      if (result === "GO") {
        console.log(`User ${user.name} is ready to play!`)
        const link = `${env.tmarsUrl}/player?id=${user.id}`
        await sendNotification(user.name, "Your turn to play!", link)
      }
    }
  } catch (error) {
    console.error(`Error checking player ${user.name} (${user.id}):`, error.message)
    return
  }
}
