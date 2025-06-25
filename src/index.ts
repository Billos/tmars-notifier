import express from "express"

import { env } from "./config"
import { createApplicationForUser, getUserApplications, sendNotification } from "./gotify"
import { UserService } from "./remote/gotify"
import { TmarsApi } from "./tmars"
import { SimplePlayerModel } from "./tmars/types/SimpleGameModel"

const app = express()

app.listen(env.port, () => {
  console.log(`Server is running on http://localhost:${env.port}`)
})

app.use(express.json())

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
      const applications = await getUserApplications(user.name)
      // has env.gotifyApplicationName in the applications
      let application = applications.find((app) => app.name === env.gotifyApplicationName)
      if (!application) {
        // - Create a tmars application in Gotify if it doesn't exist
        console.log(`Creating application for user ${user.name}...`)
        application = await createApplicationForUser(user.name, env.gotifyApplicationName)
      } else {
        console.log(`Application already exists for user ${user.name}`)
      }
      setInterval(async () => check(user), 5000)
    }
  }
}

const status: Record<string, string> = {}
async function check(user: SimplePlayerModel) {
  const { result } = await tmarsApi.waitingFor(user.id)
  if (status[user.id] !== result) {
    status[user.id] = result
    if (result === "GO") {
      console.log(`User ${user.name} is ready to play!`)
      await sendNotification(user.name, env.gotifyApplicationName, "Your turn to play!")
    }
  }
}

init()
