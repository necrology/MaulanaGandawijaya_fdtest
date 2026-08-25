type ContactNotification = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function clip(value: string, maxLength: number) {
  return value.length > maxLength
    ? `${value.slice(0, maxLength - 3)}...`
    : value;
}

export async function sendContactNotification(
  notification: ContactNotification,
) {
  const webhookUrl = process.env.CONTACT_NOTIFICATION_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return false;
  }

  const text = [
    "Pesan baru dari portfolio",
    `Nama: ${clip(notification.name, 120)}`,
    `Email: ${clip(notification.email, 160)}`,
    `Subject: ${clip(notification.subject, 180)}`,
    `Message: ${clip(notification.message, 1400)}`,
  ].join("\n");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4_000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: text,
        text,
        source: "portfolio-contact",
        contact: notification,
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
