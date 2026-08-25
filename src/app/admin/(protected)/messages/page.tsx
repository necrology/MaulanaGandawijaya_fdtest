import { MessagesManager } from "@/components/admin/MessagesManager";
import { getContactMessages } from "@/lib/repositories";

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#60a5fa]">
        Messages
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-[#f8fafc]">Manajemen Pesan Kontak</h2>
      <MessagesManager initialMessages={messages} />
    </div>
  );
}
