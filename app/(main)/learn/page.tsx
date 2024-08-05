import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgres } from "@/components/user-progress";
import { getServerSideUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
    const userProgressData = await getServerSideUserProgress();

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
            <div>
                <FeedWrapper>
                    <Header title={userProgressData.activeCourse.title} />
                </FeedWrapper>
            </div>
        </div>
    );
};

export default LearnPage;