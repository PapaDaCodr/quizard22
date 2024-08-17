import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgres } from "@/components/user-progress";
import { getServerSideUserProgress, getUnits } from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";

const LearnPage = async () => {
    try {
        const userProgressData = await getServerSideUserProgress();
        console.log('User Progress Data:', userProgressData);

        if (!userProgressData || !userProgressData.activeCourse) {
            console.log('Redirecting to /courses due to missing user progress or active course');
            redirect("/courses");
        }

        const unitsData = await getUnits();
        console.log('Units Data:', unitsData);
    const [userProgress, units] = await Promise.all([
        userProgressData,
        unitsData
    ]);

    if (!userProgressData || !userProgressData.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <div>
                <StickyWrapper>
                    <UserProgres
                        activeCourse={userProgressData.activeCourse}
                        hearts={userProgressData.hearts}
                        points={userProgressData.points}
                        hasActiveSubscription={false}
                    />
                </StickyWrapper>
            </div>
            <div className="flex-1">
                <FeedWrapper>
                    <Header title={userProgressData.activeCourse.title} />
                    {units.map((unit) => (
                        <div key={unit.id} className="mb-10">
                            <Unit
                                id={unit.id}
                                order={unit.order}
                                description={unit.description}
                                title={unit.title}
                                lessons={unit.lessons}
                                activeLesson={undefined}
                                activeLessonPercentage={0}
                            />
                        </div>
                    ))}
                </FeedWrapper>
            </div>
        </div>
    );

} catch (error) {
    console.error('Error in LearnPage:', error);
    return <div>Error loading content. Please try again later.</div>;
}
};
export default LearnPage;