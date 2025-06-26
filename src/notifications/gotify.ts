import axios, { AxiosInstance } from "axios"

import { redis } from "../redis"

export async function setEndpoint(userName: string, endpoint: string): Promise<void> {
  await redis.set(`gotify:${userName}`, endpoint)
}

export async function getEndpoint(userName: string): Promise<string | null> {
  return redis.get(`gotify:${userName}`)
}

export async function sendNotification(userName: string, message: string, link?: string | null): Promise<void> {
  const endpoint = await getEndpoint(userName)
  if (!endpoint) {
    return
  }

  // Convert the link into markdown format
  const mdLink = link ? `[Click here](${link})` : null

  const request: AxiosInstance = axios.create({})
  await request.post(endpoint, {
    title: `Tmars Notification for ${userName}`,
    message: message + (mdLink ? `\n\n${mdLink}` : ""),
    extras: {
      "client::display": {
        contentType: "text/markdown",
      },
    },
  })
}
