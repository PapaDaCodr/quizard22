import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";

const LearnPage =() => {
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <div>
                <StickyWrapper>
                    My sticky wrapper
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
