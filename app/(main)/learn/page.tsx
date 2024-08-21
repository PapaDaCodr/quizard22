import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgres } from "@/components/user-progress";
import { 
    getCourseProgress, 
    getServerSideUserProgress, 
    getUnits,
    getLessonPercentage,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";
import { lessons, units as unitsSchema} from "@/db/schema";

const LearnPage = async () => {
    try {
        const userProgressData = await getServerSideUserProgress();
        console.log('User Progress Data:', userProgressData);

        const unitsData = await getUnits();
        console.log('Units Data:', unitsData);

        const courseProgressData =  getCourseProgress();
        console.log('Course Progress Data:', courseProgressData);

        

        const lessonPercentageData =  getLessonPercentage();
        console.log('lesson Progress Data:', lessonPercentageData);

    const [userProgress, units, courseProgress, lessonPercentage ] = await Promise.all([
        userProgressData,
        unitsData,
        courseProgressData,
        lessonPercentageData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        console.log('Redirecting to /courses due to missing user progress or active course');
        redirect("/courses");
    }

    if (!courseProgress) {
        console.log('Redirecting to /courses due to missing courseProgress');
        redirect("/courses");
    }

    

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <div>
                <StickyWrapper>
                    <UserProgres
                        activeCourse={userProgress.activeCourse}
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                        hasActiveSubscription={false}
                    />
                </StickyWrapper>
            </div>
            <div className="flex-1">
                <FeedWrapper>
                    <Header title={userProgress.activeCourse.title} />
                    {units.map((unit) => (
                        <div key={unit.id} className="mb-10">
                            <Unit
                                id={unit.id}
                                order={unit.order}
                                description={unit.description}
                                title={unit.title}
                                lessons={unit.lessons}
                                activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {unit: typeof unitsSchema.$inferSelect} | undefined}
                                activeLessonPercentage={lessonPercentage}
                            />
                        </div>
                    ))}
                </FeedWrapper>
            </div>
        </div>
    );

} catch (error) {
    console.error('Error in LearnPage:', error);
    return redirect('/courses');
}
};
export default LearnPage;