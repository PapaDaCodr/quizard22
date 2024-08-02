import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgres } from "@/components/user-progress";
import { getServerSideUserProgress } from "@/db/queries";

import { redirect } from "next/navigation";


const LearnPage = async() => {
    const userProgressData = getServerSideUserProgress();

    const [UserProgress] = await Promise.all([
        userProgressData
    ]);

    if(!UserProgress || UserProgress.activeCourse){
        redirect("/courses")
    }
    if(!UserProgress || UserProgress.activeCourse){
        redirect("/learn")
    }

    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <div>
                <StickyWrapper>
                    <UserProgres 
                    activeCourse={{title: "Spanish", imageSrc: "/es.svg"}}
                    hearts={5}
                    points={0}
                    hasActiveSubscription={false}
                    />
                </StickyWrapper>
            </div>
            <div>
                <FeedWrapper>
                    <Header title="ICT" />
                    
                </FeedWrapper>
            </div>
        </div>
    );
};
export default LearnPage;
