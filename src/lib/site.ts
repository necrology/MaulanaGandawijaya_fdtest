const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "Maulana Ganda Wijaya",
  title: "Full-Stack, Mobile & IT Security Developer",
  url: (configuredSiteUrl || "https://maulana-gandawijaya.my.id").replace(
    /\/$/,
    "",
  ),
  description:
    "Portfolio profesional Maulana Ganda Wijaya yang menampilkan project full-stack, mobile, enterprise system, dan application security.",
  portfolioPdfPath:
    "/uploads/portfolio/maulana-ganda-wijaya-portfolio-2026.pdf",
  email: "maulanagandawijaya@gmail.com",
  whatsappUrl: "https://wa.me/628999228241",
  githubUrl: "https://github.com/necrology",
  linkedinUrl: "https://www.linkedin.com/in/maulanagw",
} as const;
