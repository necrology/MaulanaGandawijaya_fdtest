import { execute } from "@/lib/db";
import { handleError, ok, requireAdmin } from "@/lib/http";
import { getProfile } from "@/lib/repositories";
import { saveUploadedFile } from "@/lib/upload";
import { formNullableString, formString, requiredEmail } from "@/lib/utils";

export async function GET() {
  return ok(await getProfile());
}

export async function PUT(request: Request) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  try {
    const formData = await request.formData();
    const fullName = formString(formData, "full_name");
    const jobTitle = formString(formData, "job_title");
    const shortBio = formString(formData, "short_bio");
    const aboutDetail = formString(formData, "about_detail");
    const email = requiredEmail(formString(formData, "email"));
    const phone = formNullableString(formData, "phone");
    const location = formNullableString(formData, "location");

    if (!fullName || !jobTitle || !shortBio || !aboutDetail) {
      throw new Error("Nama, job title, bio, dan about wajib diisi.");
    }

    await execute(
      `INSERT INTO profiles
        (id, full_name, job_title, short_bio, about_detail, email, phone, location)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        full_name = VALUES(full_name),
        job_title = VALUES(job_title),
        short_bio = VALUES(short_bio),
        about_detail = VALUES(about_detail),
        email = VALUES(email),
        phone = VALUES(phone),
        location = VALUES(location)`,
      [fullName, jobTitle, shortBio, aboutDetail, email, phone, location],
    );

    const profileImageValue = formData.get("profile_image");
    const cvValue = formData.get("cv_file");
    const profileImage =
      profileImageValue instanceof File ? profileImageValue : null;
    const cvFile = cvValue instanceof File ? cvValue : null;

    const savedProfileImage = await saveUploadedFile(profileImage, "profile", {
      type: "profile",
      id: 1,
    });
    const savedCv = await saveUploadedFile(cvFile, "cv", {
      type: "profile",
      id: 1,
    });

    if (savedProfileImage) {
      await execute("UPDATE profiles SET profile_image_asset_id = ? WHERE id = 1", [
        savedProfileImage.id,
      ]);
    }

    if (savedCv) {
      await execute("UPDATE profiles SET cv_asset_id = ? WHERE id = 1", [
        savedCv.id,
      ]);
    }

    return ok(await getProfile());
  } catch (error) {
    return handleError(error);
  }
}
