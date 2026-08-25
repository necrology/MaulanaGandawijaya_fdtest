"use client";

import { useState } from "react";
import { ExternalLink, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Status = {
  type: "idle" | "success" | "error";
  message: string;
  whatsappUrl?: string;
};

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function createWhatsAppUrl(baseUrl: string, payload: ContactPayload) {
  try {
    const url = new URL(baseUrl);
    const message = [
      "Halo Maulana, saya baru mengirim pesan melalui website portfolio.",
      "",
      `Nama: ${payload.name}`,
      `Email: ${payload.email}`,
      `Subject: ${payload.subject}`,
      `Message: ${payload.message}`,
    ].join("\n");
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    return undefined;
  }
}

export function ContactForm({
  ownerWhatsAppUrl,
}: {
  ownerWhatsAppUrl: string;
}) {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: ContactPayload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
    const whatsappUrl = createWhatsAppUrl(ownerWhatsAppUrl, payload);
    const notificationWindow = whatsappUrl
      ? window.open("about:blank", "portfolio-contact-notification")
      : null;

    if (notificationWindow) {
      notificationWindow.opener = null;
      notificationWindow.document.title = "Menyiapkan WhatsApp";
      notificationWindow.document.body.style.fontFamily = "Arial, sans-serif";
      notificationWindow.document.body.style.padding = "32px";
      notificationWindow.document.body.textContent =
        "Pesan sedang disimpan. WhatsApp akan dibuka setelah selesai.";
    }

    try {
      const response = await fetch("/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        error?: string;
        data?: { notification_sent?: boolean };
      };

      if (!response.ok) {
        notificationWindow?.close();
        setStatus({
          type: "error",
          message: result.error ?? "Pesan gagal dikirim.",
        });
      } else {
        form.reset();
        const notificationSent = Boolean(result.data?.notification_sent);

        if (!notificationSent && whatsappUrl && notificationWindow) {
          notificationWindow.location.replace(whatsappUrl);
        } else {
          notificationWindow?.close();
        }

        setStatus({
          type: "success",
          message: notificationSent
            ? "Pesan tersimpan dan notifikasi sudah dikirim. Terima kasih."
            : "Pesan tersimpan. WhatsApp dibuka agar notifikasi langsung terkirim.",
          whatsappUrl: !notificationSent ? whatsappUrl : undefined,
        });
      }
    } catch {
      notificationWindow?.close();
      setStatus({
        type: "error",
        message: "Koneksi terputus. Silakan coba lagi atau hubungi via WhatsApp.",
        whatsappUrl,
      });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-blue-300/15 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-300/60 focus:bg-blue-950/20 focus:ring-4 focus:ring-blue-500/10";
  const labelClass = "mb-2 block text-sm font-medium text-slate-200";

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Nama</span>
          <input
            name="name"
            required
            className={inputClass}
            placeholder="Nama lengkap"
          />
        </label>
        <label className="block">
          <span className={labelClass}>Email</span>
          <input
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="nama@email.com"
          />
        </label>
      </div>
      <label className="block">
        <span className={labelClass}>Subject</span>
        <input
          name="subject"
          required
          className={inputClass}
          placeholder="Kolaborasi atau peluang pekerjaan"
        />
      </label>
      <label className="block">
        <span className={labelClass}>Message</span>
        <textarea
          name="message"
          required
          rows={6}
          className={inputClass}
          placeholder="Ceritakan kebutuhan, timeline, dan konteks singkat..."
        />
      </label>
      {status.message ? (
        <div
          className={
            status.type === "success"
              ? "rounded-xl border border-blue-300/25 bg-blue-500/10 px-4 py-3 text-sm text-blue-100"
              : "rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          }
        >
          <p>{status.message}</p>
          {status.whatsappUrl ? (
            <a
              href={status.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-semibold underline underline-offset-4"
            >
              Buka WhatsApp
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      ) : null}
      <div>
        <Button type="submit" disabled={loading} className="w-full md:w-fit">
          <Send className="h-4 w-4" />
          {loading ? "Mengirim..." : "Kirim & Beri Notifikasi"}
        </Button>
      </div>
    </form>
  );
}
