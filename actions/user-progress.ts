'use server'

import db from "@/db/drizzle";
import { getCoursesById } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getServerSideUserProgress } from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";


export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const course = await getCoursesById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const existingUserProgress = await getServerSideUserProgress();

  const userName = user.username ?? user.emailAddresses[0]?.emailAddress ?? "User";
  const userImageSrc = user.imageUrl ?? "/mascot.svg";

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName,
      userImageSrc,
      hearts: existingUserProgress.hearts,
      points: existingUserProgress.points || 0,
    }).where(eq(userProgress.userId, userId));
  } else {
    await db.insert(userProgress).values({
      userId,
      activeCourseId: courseId,
      userName,
      userImageSrc,
      hearts: 5,
      points: 0,
    });
  }

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
}