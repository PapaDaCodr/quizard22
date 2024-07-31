// db/server-queries.ts
import { cache } from "react";
import db from "./drizzle";
import { eq } from "drizzle-orm";
import { userProgress } from "./schema";
import { auth } from "@clerk/nextjs/server";
import { courses } from "./schema";

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});

export const getServerSideUserProgress = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getCoursesById = cache(async (courseId: number) =>{
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  })

  // TODO: Populate Units and Lessons
  return data;
});