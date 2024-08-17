import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";
import * as schema from "../db/schema";


const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {schema});

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);


    await db.insert(schema.courses).values([
      {
       id: 1,
       title: "ICT",
       imageSrc:"/ICT.svg", 
      },
      {
        id: 2,
        title: "French",
        imageSrc:"/fr.svg", 
       },
       {
        id: 3,
        title: "Spanish",
        imageSrc:"/es.svg", 
       }
    ])

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Overview Of A Computer System",
        order: 1,
      }
    ])

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        title: "Introduction to Computer System",
        
      }]);

      
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: "What is the name of an electronic tool that facilitates the input, processing, and output of information?"
      }
    ])

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        correct: true,
        text: "Computer"

      },

      {
        id: 2,
        challengeId: 1,
        correct: false,
        text: "Motherboard",
      },

      {
        id: 3,
        challengeId: 1,
        correct: false,
        text: "Operating System",
      }
    ])

    await db.insert(schema.lessons).values([
      {
        id: 2,
        unitId: 1,
        title: "History of Computer System",
      }
    ]),

    console.log("Seeding finished");
  }
  catch (error){
    console.error(error);
    throw new Error("Failed to seed database")
  }

};

main();