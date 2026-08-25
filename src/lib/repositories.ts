import { execute, query, queryOne } from "@/lib/db";
import { dateValue, parseStringArray } from "@/lib/utils";
import type {
  Asset,
  ContactMessage,
  DashboardStats,
  Experience,
  Profile,
  Project,
  ProjectImage,
  Skill,
  SkillCategory,
  SkillCategoryWithSkills,
  SocialLink,
} from "@/types/portfolio";

type ProjectRow = Omit<Project, "tech_stack" | "featured" | "images"> & {
  tech_stack: string;
  featured: number | boolean;
};

type ExperienceRow = Omit<Experience, "tech_stack" | "is_current"> & {
  tech_stack: string;
  is_current: number | boolean;
};

type SocialRow = Omit<SocialLink, "is_active"> & {
  is_active: number | boolean;
};

type ContactRow = Omit<ContactMessage, "is_read"> & {
  is_read: number | boolean;
};

const defaultProfile: Profile = {
  id: 1,
  full_name: "Maulana Ganda Wijaya",
  job_title: "Fullstack Developer",
  short_bio:
    "Saya membangun aplikasi web modern dengan Next.js, TypeScript, dan MySQL.",
  about_detail:
    "Profil belum diisi dari database. Jalankan schema dan seed SQL, lalu edit melalui admin panel.",
  email: "maulana@example.com",
  phone: null,
  location: "Indonesia",
  profile_image_asset_id: null,
  cv_asset_id: null,
  profile_image_path: "/uploads/profile-placeholder.svg",
  cv_path: "/uploads/cv-placeholder.pdf",
};

export async function getProfile() {
  const profile = await queryOne<Profile>(
    `SELECT
      p.*,
      profile_asset.path AS profile_image_path,
      cv_asset.path AS cv_path
     FROM profiles p
     LEFT JOIN assets profile_asset ON profile_asset.id = p.profile_image_asset_id
     LEFT JOIN assets cv_asset ON cv_asset.id = p.cv_asset_id
     WHERE p.id = 1
     LIMIT 1`,
  );

  return profile ?? defaultProfile;
}

export async function getSkillCategoriesWithSkills() {
  const categories = await query<SkillCategory>(
    "SELECT * FROM skill_categories ORDER BY sort_order ASC, name ASC",
  );
  const skills = await query<Skill & { category_name: string }>(
    `SELECT s.*, c.name AS category_name
     FROM skills s
     INNER JOIN skill_categories c ON c.id = s.category_id
     ORDER BY c.sort_order ASC, s.sort_order ASC, s.name ASC`,
  );

  return categories.map((category) => ({
    ...category,
    skills: skills.filter((skill) => skill.category_id === category.id),
  })) satisfies SkillCategoryWithSkills[];
}

export async function getSkills() {
  return query<Skill & { category_name: string }>(
    `SELECT s.*, c.name AS category_name
     FROM skills s
     INNER JOIN skill_categories c ON c.id = s.category_id
     ORDER BY c.sort_order ASC, s.sort_order ASC, s.name ASC`,
  );
}

function normalizeProject(row: ProjectRow): Project {
  return {
    ...row,
    tech_stack: parseStringArray(row.tech_stack),
    featured: Boolean(row.featured),
  };
}

export async function getProjectImages(projectId: number) {
  return query<ProjectImage>(
    `SELECT pi.*, a.path, a.original_name
     FROM project_images pi
     INNER JOIN assets a ON a.id = pi.asset_id
     WHERE pi.project_id = ?
     ORDER BY pi.sort_order ASC, pi.id ASC`,
    [projectId],
  );
}

async function attachProjectImages(projects: Project[]) {
  if (projects.length === 0) {
    return projects;
  }

  const ids = projects.map((project) => project.id);
  const placeholders = ids.map(() => "?").join(",");
  const images = await query<ProjectImage>(
    `SELECT pi.*, a.path, a.original_name
     FROM project_images pi
     INNER JOIN assets a ON a.id = pi.asset_id
     WHERE pi.project_id IN (${placeholders})
     ORDER BY pi.sort_order ASC, pi.id ASC`,
    ids,
  );

  return projects.map((project) => ({
    ...project,
    images: images.filter((image) => image.project_id === project.id),
  }));
}

export async function getProjects(options?: { featuredOnly?: boolean }) {
  const where = options?.featuredOnly ? "WHERE p.featured = TRUE" : "";
  const rows = await query<ProjectRow>(
    `SELECT p.*, thumbnail.path AS thumbnail_path
     FROM projects p
     LEFT JOIN assets thumbnail ON thumbnail.id = p.thumbnail_asset_id
     ${where}
     ORDER BY p.sort_order ASC, p.created_at DESC`,
  );

  return attachProjectImages(rows.map(normalizeProject));
}

export async function getProjectById(id: number) {
  const row = await queryOne<ProjectRow>(
    `SELECT p.*, thumbnail.path AS thumbnail_path
     FROM projects p
     LEFT JOIN assets thumbnail ON thumbnail.id = p.thumbnail_asset_id
     WHERE p.id = ?
     LIMIT 1`,
    [id],
  );

  if (!row) {
    return null;
  }

  const project = normalizeProject(row);
  project.images = await getProjectImages(project.id);
  return project;
}

export async function getProjectBySlug(slug: string) {
  const row = await queryOne<ProjectRow>(
    `SELECT p.*, thumbnail.path AS thumbnail_path
     FROM projects p
     LEFT JOIN assets thumbnail ON thumbnail.id = p.thumbnail_asset_id
     WHERE p.slug = ?
     LIMIT 1`,
    [slug],
  );

  if (!row) {
    return null;
  }

  const project = normalizeProject(row);
  project.images = await getProjectImages(project.id);
  return project;
}

function normalizeExperience(row: ExperienceRow): Experience {
  return {
    ...row,
    start_date: dateValue(row.start_date),
    end_date: row.end_date ? dateValue(row.end_date) : null,
    is_current: Boolean(row.is_current),
    tech_stack: parseStringArray(row.tech_stack),
  };
}

export async function getExperiences() {
  const rows = await query<ExperienceRow>(
    "SELECT * FROM experiences ORDER BY sort_order ASC, start_date DESC",
  );
  return rows.map(normalizeExperience);
}

export async function getSocialLinks(options?: { activeOnly?: boolean }) {
  const where = options?.activeOnly ? "WHERE is_active = TRUE" : "";
  const rows = await query<SocialRow>(
    `SELECT * FROM social_links ${where} ORDER BY sort_order ASC, platform ASC`,
  );

  return rows.map((row) => ({
    ...row,
    is_active: Boolean(row.is_active),
  }));
}

export async function getContactMessages() {
  const rows = await query<ContactRow>(
    "SELECT * FROM contact_messages ORDER BY created_at DESC",
  );
  return rows.map((row) => ({
    ...row,
    is_read: Boolean(row.is_read),
  }));
}

export async function getAssets() {
  return query<Asset>("SELECT * FROM assets ORDER BY created_at DESC, id DESC");
}

export async function getDashboardStats() {
  const [projects, skills, experiences, messages, unread, assets] =
    await Promise.all([
      queryOne<{ total: number }>("SELECT COUNT(*) AS total FROM projects"),
      queryOne<{ total: number }>("SELECT COUNT(*) AS total FROM skills"),
      queryOne<{ total: number }>("SELECT COUNT(*) AS total FROM experiences"),
      queryOne<{ total: number }>("SELECT COUNT(*) AS total FROM contact_messages"),
      queryOne<{ total: number }>(
        "SELECT COUNT(*) AS total FROM contact_messages WHERE is_read = FALSE",
      ),
      queryOne<{ total: number }>("SELECT COUNT(*) AS total FROM assets"),
    ]);

  return {
    projects: projects?.total ?? 0,
    skills: skills?.total ?? 0,
    experiences: experiences?.total ?? 0,
    messages: messages?.total ?? 0,
    unread_messages: unread?.total ?? 0,
    assets: assets?.total ?? 0,
  } satisfies DashboardStats;
}

export async function deleteAssetById(id: number) {
  const asset = await queryOne<Asset>("SELECT * FROM assets WHERE id = ? LIMIT 1", [
    id,
  ]);

  if (!asset) {
    return null;
  }

  await execute(
    "UPDATE profiles SET profile_image_asset_id = NULL WHERE profile_image_asset_id = ?",
    [id],
  );
  await execute("UPDATE profiles SET cv_asset_id = NULL WHERE cv_asset_id = ?", [id]);
  await execute("UPDATE projects SET thumbnail_asset_id = NULL WHERE thumbnail_asset_id = ?", [
    id,
  ]);
  await execute("DELETE FROM project_images WHERE asset_id = ?", [id]);
  await execute("DELETE FROM assets WHERE id = ?", [id]);

  return asset;
}
