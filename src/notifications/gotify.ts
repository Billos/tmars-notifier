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

  try {
    const url = new URL(endpoint)
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `Tmars Notification for ${userName}`,
        message: message + (mdLink ? `\n\n${mdLink}` : ""),
        extras: {
          "client::display": {
            contentType: "text/markdown",
          },
        },
      }),
    })

    const response = await result.json()

    return response.id != null ? String(response.id) : null
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
    const endpointUrl = new URL(endpoint)
    const token = endpointUrl.searchParams.get("token")
    const deleteUrl = new URL(`${endpointUrl.origin}/message/${notificationId}`)
    deleteUrl.searchParams.append("token", token ?? "")

    await fetch(deleteUrl, { method: "DELETE" })
    console.log(`Deleted Gotify notification ${notificationId} for ${userName}`)
  } catch {
    // Best-effort deletion — ignore errors
  }
}
