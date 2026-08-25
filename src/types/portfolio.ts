export type AssetCategory = "profile" | "cv" | "project" | "skill" | "general";

export type Asset = {
  id: number;
  original_name: string;
  file_name: string;
  path: string;
  mime_type: string;
  size: number;
  category: AssetCategory;
  related_type: string | null;
  related_id: number | null;
  created_at: string;
};

export type Profile = {
  id: number;
  full_name: string;
  job_title: string;
  short_bio: string;
  about_detail: string;
  email: string;
  phone: string | null;
  location: string | null;
  profile_image_asset_id: number | null;
  cv_asset_id: number | null;
  profile_image_path: string | null;
  cv_path: string | null;
  created_at?: string;
  updated_at?: string;
};

export type SkillCategory = {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
};

export type Skill = {
  id: number;
  category_id: number;
  category_name?: string;
  name: string;
  icon: string | null;
  level: number;
  sort_order: number;
};

export type SkillCategoryWithSkills = SkillCategory & {
  skills: Skill[];
};

export type ProjectImage = {
  id: number;
  project_id: number;
  asset_id: number;
  caption: string | null;
  sort_order: number;
  path: string;
  original_name: string;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  detail_description: string;
  tech_stack: string[];
  demo_link: string | null;
  github_link: string | null;
  thumbnail_asset_id: number | null;
  thumbnail_path: string | null;
  featured: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  images?: ProjectImage[];
};

export type Experience = {
  id: number;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  tech_stack: string[];
  sort_order: number;
};

export type SocialLink = {
  id: number;
  platform: string;
  url: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type AdminUser = {
  id: number;
  name: string;
  email: string;
};

export type DashboardStats = {
  projects: number;
  skills: number;
  experiences: number;
  messages: number;
  unread_messages: number;
  assets: number;
};
