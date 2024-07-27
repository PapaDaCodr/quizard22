import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";

const LearnPage =() => {
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <div>
                <StickyWrapper>
                    <UserProgress 
                    activeCourse={{title: "ICT", imageSrc:"/ICT.svg" }}
                    hearts={5}
                    points={100}
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
