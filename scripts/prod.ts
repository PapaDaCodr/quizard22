import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert ICT course
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "ICT", imageSrc: "/ict.svg" },
      ])
      .returning();

    // For the ICT course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Computer Basics",
            description: "Learn the fundamentals of computer systems",
            order: 1,
          },
          {
            courseId: course.id,
            title: "Data and Information",
            description: "Understand data processing and information",
            order: 2,
          },
          {
            courseId: course.id,
            title: "Input and Output Devices",
            description: "Explore various computer peripherals",
            order: 3,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Computer Overview", order: 1 },
            { unitId: unit.id, title: "Computer Components", order: 2 },
            { unitId: unit.id, title: "Computer History", order: 3 },
            { unitId: unit.id, title: "Operating Systems", order: 4 },
            { unitId: unit.id, title: "Binary and Data Representation", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'What is the name of an electronic tool that facilitates the input, processing, and output of information?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'What is the term for a small picture that represents a folder, program, or other items on a computer?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'What is referred to as the brain of the computer, responsible for calculations, movement, and processing of information?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'What is the name of the computer\'s short-term memory that is lost when the computer is turned off?',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'What term is used to describe the physical components of a computer?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which of the following numbers is a binary number?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Who is considered the father of Computers?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which was the most popular first generation computer?',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Computer",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Operating system",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Motherboard",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Icon",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Desktop",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Graphic",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "CPU",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "RAM",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Motherboard",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "RAM",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "CPU",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Hardware",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Hardware",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Hard Drive",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Physical ware",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "0 and 1",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "1 and 2",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "1 and 0.1",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Charles Babbage",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "James Gosling",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Dennis Ritchie",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "IBM 1650",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "IBM 360",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "IBM 1130",
                },
              ]);
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();