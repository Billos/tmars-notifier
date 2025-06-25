import axios, { AxiosInstance } from "axios"

import { env } from "../config"
import { Application, ApplicationService, OpenAPI, User, UserService } from "../remote/gotify"

function setUser(user: Partial<User>): void {
  if (!user.admin) {
    OpenAPI.WITH_CREDENTIALS = true
    OpenAPI.TOKEN = undefined
    OpenAPI.USERNAME = user.name
    OpenAPI.PASSWORD = env.gotifyDefaultPassword
  } else {
    OpenAPI.WITH_CREDENTIALS = false
    OpenAPI.TOKEN = env.gotifyAdminToken
    OpenAPI.USERNAME = undefined
    OpenAPI.PASSWORD = undefined
  }
}

// This function retrieves the user ID for a given user name from Gotify.
// If the user does not exist, it creates a new user with the default password.
export async function getUser(userName: string): Promise<User> {
  setUser({ admin: true })
  const users = await UserService.getUsers()
  const lowerName = userName.toLowerCase()
  const user = users.find((user) => user.name === lowerName)

  if (user) {
    return user
  } else {
    return await UserService.createUser({
      admin: false,
      name: lowerName,
      pass: env.gotifyDefaultPassword,
    })
  }
}

export async function getUserApplications(userName: string): Promise<Application[]> {
  console.log(`Getting applications for user: ${userName}`)
  //   const userId = await getUserId(user)
  const user = await getUser(userName)
  setUser(user)

  const applications = await ApplicationService.getApps()
  console.log(`Applications for user ${user.name}: ${applications.length}`)

  return applications
}

export async function createApplicationForUser(userName: string, applicationName: string): Promise<Application> {
  console.log(`Creating application for user: ${userName}, application: ${applicationName}`)
  const user = await getUser(userName)
  setUser(user)

  const existingApps = await ApplicationService.getApps()
  const existingApp = existingApps.find((app) => app.name === applicationName)

  if (existingApp) {
    console.log(`Application ${applicationName} already exists for user ${user.name}`)
    return existingApp
  }

  const newApp = await ApplicationService.createApp({
    name: applicationName,
    description: `Tmars application for user ${user.name}`,
  })

  console.log(`Application ${applicationName} created for user ${user.name}`)

  return newApp
}

export async function getApplicationForUser(userName: string, applicationName: string): Promise<Application | undefined> {
  const user = await getUser(userName)
  setUser(user)

  const applications = await ApplicationService.getApps()
  return applications.find((app) => app.name === applicationName)
}

export async function sendNotification(userName: string, applicationName: string, message: string) {
  const application = await getApplicationForUser(userName, applicationName)
  if (!application) {
    console.error(`Application ${applicationName} not found for user ${userName}`)
    return
  }

  const request: AxiosInstance = axios.create({
    baseURL: env.gotifyUrl,
    headers: { "X-Gotify-Key": application.token },
  })
  await request.post("/message", {
    title: `Tmars Notification for ${userName}`,
    message,
  })
}
