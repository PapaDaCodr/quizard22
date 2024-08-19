// db/server-queries.ts
import { cache } from "react";
import db from "./drizzle";
import { asc, eq } from "drizzle-orm";
import { challengeProgress, units, userProgress } from "./schema";
import { auth } from "@clerk/nextjs/server";
import { courses } from "./schema";

export const getUnits = cache(async () => {
  const {userId} = await auth();
  const userProgress = await getServerSideUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lesson:{
        with:{
          challenges: {
            with:{
              challengeProgress: {
                where: eq(challengeProgress.userId, userId)
              }
            },
          },
        }, 
      },
    },
  })

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lesson.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return challenge.challengeProgress
        && challenge.challengeProgress.length > 0
        && challenge.challengeProgress.every((progress) => progress.completed); 
      });

      return { ...lesson, completed: allCompletedChallenges };
    })

    return { ...unit, lessons: lessonsWithCompletedStatus}
  });

  return normalizedData;
});



export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});

export const getServerSideUserProgress = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    console.log("No userId found");
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  console.log("User progress data:", data);
  return data;
});

export const getCoursesById = cache(async (courseId: number) =>{
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  })

  // TODO: Populate Units and Lessons
  return data;
});

export const getCourseProgress = cache(async () => {
  const {userId} = await auth();
  const userProgress = await getServerSideUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }
  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, {asc}) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lesson: {
        orderBy: (lessons, {asc}) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId)
              },
            },
          },
        },
      },
    },
  });

  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lesson)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return !challenge.challengeProgress || 
        challenge.challengeProgress.length === 0;
      });
    });

    return {
      activeLesson: firstUncompletedLesson,
      activeLessonId: firstUncompletedLesson?.id,
    };
});

export const getLesson = cache(async (id?: number) => {
   const {userId} = await auth();
   const courseProgress = await getCourseProgress();

   const lessonId = id || courseProgress?.activeLessonId;

   if(!lessonId) {
    return null;
   }

   const data = await db.query.lessons.findFirst({})
})


