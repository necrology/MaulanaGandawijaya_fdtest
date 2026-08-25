import {
  BriefcaseBusiness,
  FolderKanban,
  Image,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getDashboardStats } from "@/lib/repositories";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const cards = [
    { label: "Projects", value: stats.projects, icon: FolderKanban },
    { label: "Skills", value: stats.skills, icon: Sparkles },
    { label: "Experience", value: stats.experiences, icon: BriefcaseBusiness },
    { label: "Messages", value: stats.messages, icon: MessageSquare },
    { label: "Unread", value: stats.unread_messages, icon: MessageSquare },
    { label: "Assets", value: stats.assets, icon: Image },
  ];

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#60a5fa]">
        Dashboard
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-[#f8fafc]">Ringkasan Portfolio</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-[#94a3b8]">{item.label}</p>
                  <p className="mt-2 text-4xl font-semibold text-[#f8fafc]">{item.value}</p>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-sm border border-[#1e3a5f] bg-[#020617]">
                  <Icon className="h-5 w-5 text-[#38bdf8]" />
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
