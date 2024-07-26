import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};


export const Sidebar = () => {
    return (
        <div className={cn("flex bg-indigo-500 h-full left-0 top-0 px-4 border-r-2 flex-col lg:w-[256px] lg:fixed")}>
            Sidebar

        </div>
    )
}