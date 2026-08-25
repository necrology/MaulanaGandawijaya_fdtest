"use client";

import { useState } from "react";
import { CheckCheck, MailOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { ContactMessage } from "@/types/portfolio";

type ApiResponse<T> = {
  data?: T;
};

export function MessagesManager({
  initialMessages,
}: {
  initialMessages: ContactMessage[];
}) {
  const [messages, setMessages] = useState(initialMessages);

  async function refresh() {
    const response = await fetch("/api/contact-messages");
    const result = (await response.json()) as ApiResponse<ContactMessage[]>;
    if (result.data) {
      setMessages(result.data);
    }
  }

  async function mark(id: number, isRead: boolean) {
    await fetch(`/api/contact-messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_read: isRead }),
    });
    await refresh();
  }

  async function remove(id: number) {
    if (!confirm("Hapus pesan ini?")) {
      return;
    }
    await fetch(`/api/contact-messages/${id}`, { method: "DELETE" });
    await refresh();
  }

  return (
    <div className="mt-8 grid gap-4">
      {messages.map((message) => (
        <Card key={message.id} className={message.is_read ? "opacity-70" : ""}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-[#f8fafc]">{message.subject}</h3>
                <span className="rounded-sm border border-[#1e3a5f] bg-[#020617] px-2 py-1 text-xs text-[#94a3b8]">
                  {message.is_read ? "Dibaca" : "Baru"}
                </span>
              </div>
              <p className="mt-2 text-sm text-[#60a5fa]">
                {message.name} - {message.email}
              </p>
              <p className="mt-1 text-xs text-[#64748b]">{message.created_at}</p>
              <p className="mt-4 whitespace-pre-line leading-7 text-[#94a3b8]">
                {message.message}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" onClick={() => mark(message.id, !message.is_read)}>
                {message.is_read ? (
                  <MailOpen className="h-4 w-4" />
                ) : (
                  <CheckCheck className="h-4 w-4" />
                )}
                {message.is_read ? "Unread" : "Read"}
              </Button>
              <Button variant="danger" onClick={() => remove(message.id)}>
                <Trash2 className="h-4 w-4" />
                Hapus
              </Button>
            </div>
          </div>
        </Card>
      ))}
      {messages.length === 0 ? (
        <Card>
          <p className="text-[#94a3b8]">Belum ada pesan masuk.</p>
        </Card>
      ) : null}
    </div>
  );
}
