import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgres } from "@/components/user-progress";
import { getServerSideUserProgress, getUnits } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
    try {
        const userProgressData = await getServerSideUserProgress();
        const unitsData = await getUnits();

        console.log('User Progress:', userProgressData);
        console.log('Units:', unitsData);

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
                        <div key={unit.id} className="mb-10 border rounded-lg p-4">
                            <h2 className="text-2xl font-bold mb-4">{unit.title}</h2>
                            <p>{unit.description}</p>
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold mb-2">Lessons:</h3>
                                {unit.lessons.map((lesson) => (
                                    <div key={lesson.id} className="mb-2 p-2 border rounded">
                                        <h4 className="font-medium">{lesson.title}</h4>
                                        <p>Status: {lesson.completed ? 'Completed' : 'In Progress'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </FeedWrapper>
            </div>
        </div>
    );

} catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading content. Please try again later.</div>;
}
};

export default LearnPage;