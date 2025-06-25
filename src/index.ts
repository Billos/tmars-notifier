import express from "express"

import { env } from "./config"
import { assertNotificationEngine, sendNotification, setNotificationEndpoint, setNotificationEngine } from "./notifications/index"
import { redis } from "./redis"
import { UserService } from "./remote/gotify"
import { TmarsApi } from "./tmars"
import { SimplePlayerModel } from "./tmars/types/SimpleGameModel"

const app = express()

app.listen(env.port, () => {
  console.log(`Server is running on http://localhost:${env.port}`)
})

app.use(express.json())

app.get("/notification/set/:engine", async (req, res) => {
  const { engine } = req.params
  const { username, endpoint } = req.query
  if (typeof username !== "string" || typeof endpoint !== "string") {
    return res.status(400).send("Invalid query parameters")
  }

  if (!assertNotificationEngine(engine)) {
    return res.status(400).send("Invalid engine type")
  }

  console.log(`Setting notification engine for user: ${username}, engine: ${engine}`)
  await setNotificationEngine(username, engine)
  await setNotificationEndpoint(username, endpoint)
  return res.sendStatus(200)
})

app.get("/notification/test", async (req, res) => {
  const { username } = req.query
  if (typeof username !== "string") {
    return res.status(400).send("Invalid query parameter")
  }
  await sendNotification(username, "Test notification from Tmars bot")
  return res.sendStatus(200)
})

const tmarsApi = new TmarsApi()
async function init() {
  const gotifyUsers = await UserService.getUsers()
  console.log("Gotify users fetched:", gotifyUsers)
  // Gotify run consists of:
  // - Getting the list of games from Tmars
  const games = await tmarsApi.games()

  for (const { gameId } of games) {
    const game = await tmarsApi.game(gameId)
    // - Fetching users in the active games
    // - Assert that those users exist in the Gotify server
    for (const user of game.players) {
      setInterval(async () => check(user), 5000)
    }
  }
}

async function check(user: SimplePlayerModel) {
  const currentStatus = await redis.get(`tmars:${user.id}:status`)
  const { result } = await tmarsApi.waitingFor(user.id)
  if (currentStatus !== result) {
    await redis.set(`tmars:${user.id}:status`, result)
    if (result === "GO") {
      console.log(`User ${user.name} is ready to play!`)
      await sendNotification(user.name, "Your turn to play!")
    }
  }
}

init()
