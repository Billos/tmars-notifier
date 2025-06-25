import axios, { AxiosInstance } from "axios"

// import { env } from "../config"
import { redis } from "../redis"

// import { Application, ApplicationService, OpenAPI, User, UserService } from "../remote/gotify"

// function setUser(user: Partial<User>): void {
//   if (!user.admin) {
//     OpenAPI.WITH_CREDENTIALS = true
//     OpenAPI.TOKEN = undefined
//     OpenAPI.USERNAME = user.name
//     OpenAPI.PASSWORD = env.gotifyDefaultPassword
//   } else {
//     OpenAPI.WITH_CREDENTIALS = false
//     OpenAPI.TOKEN = env.gotifyAdminToken
//     OpenAPI.USERNAME = undefined
//     OpenAPI.PASSWORD = undefined
//   }
// }

// // This function retrieves the user ID for a given user name from Gotify.
// // If the user does not exist, it creates a new user with the default password.
// async function getUser(userName: string): Promise<User> {
//   setUser({ admin: true })
//   const users = await UserService.getUsers()
//   const lowerName = userName.toLowerCase()
//   const user = users.find((user) => user.name === lowerName)

//   if (user) {
//     return user
//   } else {
//     return await UserService.createUser({
//       admin: false,
//       name: lowerName,
//       pass: env.gotifyDefaultPassword,
//     })
//   }
// }

// async function setImage(userName: string, applicationId: number): Promise<void> {
//   const user = await getUser(userName)
//   setUser(user)

//   const url = "http://s3.billos.fr/tmars.png"
//   const response = await fetch(url)
//   const blob = await response.blob()
//   const file = new File([blob], "image.png", { type: blob.type })
//   await ApplicationService.uploadAppImage(file, applicationId)
// }

// async function createApplicationForUser(userName: string, applicationName: string): Promise<Application> {
//   console.log(`Creating application for user: ${userName}, application: ${applicationName}`)
//   const user = await getUser(userName)
//   setUser(user)

//   const newApp = await ApplicationService.createApp({
//     name: applicationName,
//     description: `Tmars application for user ${user.name}`,
//   })

//   console.log(`Application ${applicationName} created for user ${user.name}`)

//   return newApp
// }

// async function getApplicationForUser(userName: string, applicationName: string): Promise<Application> {
//   const user = await getUser(userName)
//   setUser(user)

//   const applications = await ApplicationService.getApps()
//   let application = applications.find((app) => app.name === applicationName)
//   if (!application) {
//     application = await createApplicationForUser(user.name, env.gotifyApplicationName)
//     await setImage(user.name, application.id)
//   }

//   return application
// }

export async function setEndpoint(userName: string, endpoint: string): Promise<void> {
  await redis.set(`gotify:${userName}`, endpoint)
}

export async function getEndpoint(userName: string): Promise<string | null> {
  return redis.get(`gotify:${userName}`)
}

export async function sendNotification(userName: string, message: string): Promise<void> {
  const endpoint = await getEndpoint(userName)
  if (!endpoint) {
    return
  }
  const request: AxiosInstance = axios.create({})
  await request.post(endpoint, {
    title: `Tmars Notification for ${userName}`,
    message,
  })
}
