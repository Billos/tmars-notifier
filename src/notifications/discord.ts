import { redis } from "../redis"

export async function setEndpoint(userName: string, endpoint: string): Promise<void> {
  await redis.set(`discord:${userName}`, endpoint)
}

export async function getEndpoint(userName: string): Promise<string | null> {
  return redis.get(`discord:${userName}`)
}

export async function sendNotification(userName: string, message: string): Promise<void> {
  const webhookUrl = await getEndpoint(userName)

  const payload = {
    content: `🚀 **TMars Notification**\n\n${message}`,
    username: "TMars Notifier",
    avatar_url: "https://raw.githubusercontent.com/terraforming-mars/terraforming-mars/refs/heads/main/assets/favicon.ico",
    embeds: [
      {
        title: "Terraforming Mars",
        description: message,
        color: 0xff6b35, // Orange color for Mars theme
        fields: [
          {
            name: "Player",
            value: userName,
            inline: true,
          },
          {
            name: "Action Required",
            value: "It's your turn!",
            inline: true,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "TMars Notifier",
          icon_url: "https://raw.githubusercontent.com/terraforming-mars/terraforming-mars/refs/heads/main/assets/favicon.ico",
        },
      },
    ],
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    console.error(`Discord notification failed: ${response.status} ${response.statusText}`)
  }
}
