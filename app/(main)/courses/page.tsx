// app/courses/page.tsx
import { getCourses, getServerSideUserProgress } from "@/db/queries";
import { List } from "./list";

const CoursesPage = async () => {
  const [courses, userProgress] = await Promise.all([
    getCourses(),
    getServerSideUserProgress()
  ]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">
        Courses Page
      </h1>
      <List 
        courses={courses}
        activeCourseId={userProgress?.activeCourse?.id || null}
      />
    </div>
  );
};

export default CoursesPage;