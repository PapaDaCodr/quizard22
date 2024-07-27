import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import {
    ClerkLoading,
    ClerkLoaded,
    UserButton
} from "@clerk/nextjs"
import { Loader } from "lucide-react";

type Props = {
    className?: string;
};


export const Sidebar = ({className}: Props) => {
    return (
       
        <div className={cn("flex h-full left-0 top-0 px-4 border-r-2 flex-col lg:w-[256px] lg:fixed", className,)}>
             <Link href="/learn">
            <div className="pt-8 pl-4 pd-7 flex items-center gap-x-3">
                    <Image src="/mascot.svg" height={40} width={40} alt="Mascot"/>
                    <h1 className="text-2xl font-extrabold text-green-500 tracking-wide">
                        Quizard
                    </h1>
            </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-2 pt-3">
                <SidebarItem 
                label="learn"
                 href="/learn"
                 iconSrc="/learn.svg"
                 />
            </div>
            <div className="flex flex-col gap-y-2 flex-2 pt-3">
                <SidebarItem 
                label="leaderboard"
                 href="/leaderboard"
                 iconSrc="/leaderboard.svg"
                 />
            </div>
            <div className="flex flex-col gap-y-2 flex-2 pt-3">
                <SidebarItem 
                label="quests"
                 href="/quests"
                 iconSrc="/quests.svg"
                 />
            </div>
            <div className="flex flex-col gap-y-2 flex-2 pt-3">
                <SidebarItem 
                label="shop"
                 href="/shop"
                 iconSrc="/shop.svg"
                 />
            </div>
            <div className="p-4">
            <ClerkLoading>
                <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                <ClerkLoaded>
                    <UserButton afterSwitchSessionUrl="/" />
                </ClerkLoaded>
            </ClerkLoading>
            </div>

        </div>
    )
}