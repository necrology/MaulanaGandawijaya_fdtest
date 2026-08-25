import { execute } from "@/lib/db";
import { sendContactNotification } from "@/lib/contact-notification";
import { handleError, ok, requireAdmin } from "@/lib/http";
import { getContactMessages } from "@/lib/repositories";
import { requiredEmail, requiredString } from "@/lib/utils";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  return ok(await getContactMessages());
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = requiredString(body.name, "Nama");
    const email = requiredEmail(body.email);
    const subject = requiredString(body.subject, "Subject");
    const message = requiredString(body.message, "Message");

    await execute(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject, message],
    );

    const notificationSent = await sendContactNotification({
      name,
      email,
      subject,
      message,
    });

    return ok(
      {
        message: "Pesan berhasil dikirim.",
        notification_sent: notificationSent,
      },
      201,
    );
  } catch (error) {
    return handleError(error);
  }
}
