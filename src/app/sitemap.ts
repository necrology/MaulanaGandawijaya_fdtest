import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/skills",
  "/projects",
  "/experience",
  "/contact",
  "/projects/pos-pujasera-koperasi-pt-inti",
  "/projects/electronic-medical-record-emr",
  "/projects/hospital-mobile-application",
  "/projects/e-voting-application-research",
  "/projects/company-profile-website-koperasi-pt-inti",
  "/projects/security-checkpoint-patrol-system",
  "/projects/erp-distribusi-farmasi-alat-kesehatan",
  "/projects/doctor-scheduling-application",
  "/projects/corporate-voucher-management",
  "/projects/posmcc-v2",
  "/projects/material-requirement-planning-mrp",
  "/projects/po-purchasing-system",
  "/projects/crm-system",
  "/projects/learning-development-video-platform",
  "/projects/event-pos-system",
  "/projects/application-security-assessment",
  "/projects/baregad-sparepart-ecommerce",
  "/projects/rsud-otista-mobile-sipantes",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/projects" ? 0.9 : 0.8,
  }));
}
