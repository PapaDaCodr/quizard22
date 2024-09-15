## Quizard: Interactive Quiz and Learning Platform

## Project Overview
Quizard is a comprehensive interactive quiz and learning platform built as a Software as a Service (SaaS) application. It aims to provide an engaging and interactive experience for users learning new subjects through quizzes, incorporating various features to enhance user engagement and motivation.

## Technology Stack

Frontend: Next.js 14, React
Backend: Next.js API routes, Server Actions
Database: PostgreSQL (using NeonDB)
ORM: DrizzleORM
Authentication: Clerk
Payment Processing: Stripe
UI Components: Shadcn UI
AI Voice Generation: ElevenLabs AI
State Management: Custom hooks and context
Styling: Tailwind CSS
Key Features
Course Selection: Users can choose from various subject courses.
Interactive Quizzes: Quizzes include AI-generated voices for audio questions and feedback.
Dynamic Heart System: Users have a limited number of hearts per quiz, encouraging careful progress.
Points/XP System: Users earn points for correctly answered questions.
Practice Mode: Users can revisit completed quizzes to regain hearts.
Shop System: Points can be exchanged for hearts in the in-app shop.
Leaderboard: Ranking system based on user points.
Quest Milestones: Achievement system for reaching certain point thresholds.
Premium Subscription: Offers unlimited hearts using Stripe integration.
Admin Dashboard: Comprehensive management system for courses, quizzes, and user data.
Responsive Design: Fully functional on various devices and screen sizes.



## Core Components

Course System
Courses are structured into units, which contain quizzes.
Each quiz consists of multiple challenges. 
The course data is managed through the admin dashboard and stored in the PostgreSQL database.

## Quiz Flow

User selects a course and quiz.
Challenges are presented sequentially.
User interacts with questions, potentially using AI-generated voices.
Correct answers award points; incorrect answers deduct hearts.
Quiz completes when all challenges are answered or hearts are depleted.
Heart System
Users start with a set number of hearts.
Incorrect answers deduct hearts.
When hearts are depleted, users are prompted to practice or use the shop.
Premium users have unlimited hearts.
Points and XP System
Points are awarded for correct answers.
Accumulating points advances users on the leaderboard and unlocks achievements.
Practice Mode
Users can revisit completed quizzes to regain hearts without risking their current progress.

## Shop System
Users can exchange points for hearts.
Implements a virtual economy within the application.
Premium Subscription
Integrated with Stripe for payment processing.
Offers unlimited hearts and potentially other exclusive features.

## Admin Dashboard
Built using React Admin, allowing for:

Course management (add, edit, delete)
Quiz and challenge creation



## Database Schema

The database schema includes tables for:

Users
Courses
Units
Quizzes
Challenges
UserProgress
Transactions (for the shop system)
Subscriptions

## Authentication and Authorization
Clerk is used for user authentication, providing secure login and registration processes. Authorization is handled through custom middleware to ensure users can only access appropriate resources.

## AI Voice Integration
ElevenLabs AI is used to generate realistic voice outputs for audio questions and feedback. This is integrated into the challenge system to provide audio interaction.

## State Management
Custom React hooks and context are used for state management, allowing for efficient data flow and component updates.

## Responsive Design
Tailwind CSS is utilized to ensure the application is fully responsive across various devices and screen sizes.


## UI Components
The project uses Shadcn UI for building a consistent and attractive user interface. Components can be added as needed using the Shadcn CLI. 


## Deployment
The application is designed to be deployed on Vercel, leveraging its integration with Next.js for optimal performance and ease of deployment. (yet to be deployed)

## Future Enhancements
Potential areas for future development include:

Expanding the course library
Implementing more interactive challenge types
Analytics and reporting
Enhancing the AI voice system for more natural audio interactions
Developing a mobile application

## Conclusion
Quizard represents a comprehensive approach to interactive learning and quizzing, combining modern web technologies with engaging gamification elements. Its modular design allows for easy expansion and maintenance, making it a robust platform for both users and administrators.
