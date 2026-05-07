import axios, { AxiosInstance } from "axios"

import { redis } from "../redis"

export async function setEndpoint(userName: string, endpoint: string): Promise<void> {
  await redis.set(`gotify:${userName}`, endpoint)
}

export async function getEndpoint(userName: string): Promise<string | null> {
  return redis.get(`gotify:${userName}`)
}

export async function sendNotification(userName: string, message: string, link?: string | null): Promise<string | null> {
  const endpoint = await getEndpoint(userName)
  if (!endpoint) {
    return null
  }

  // Convert the link into markdown format
  const mdLink = link ? `[Click here](${link})` : null

  const request: AxiosInstance = axios.create({})
  try {
    const response = await request.post(endpoint, {
      title: `Tmars Notification for ${userName}`,
      message: message + (mdLink ? `\n\n${mdLink}` : ""),
      extras: {
        "client::display": {
          contentType: "text/markdown",
        },
      },
    })
    return response.data?.id != null ? String(response.data.id) : null
  } catch {
    return null
  }
}

export async function deleteNotification(userName: string, notificationId: string): Promise<void> {
  const endpoint = await getEndpoint(userName)
  if (!endpoint) {
    return
  }

  try {
    const url = new URL(endpoint)
    const token = url.searchParams.get("token")
    const deleteUrl = `${url.origin}/message/${notificationId}`
    const request: AxiosInstance = axios.create({})
    await request.delete(deleteUrl, ...(token ? [{ params: { token } }] : []))
    console.log(`Deleted Gotify notification ${notificationId} for ${userName}`)
  } catch {
    // Best-effort deletion — ignore errors
  }
}
