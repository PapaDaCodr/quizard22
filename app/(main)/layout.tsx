import { Children } from "react";
import { Sidebar } from "@/components/sidebar";
type Props ={
    children: React.ReactNode;
};

const MainLayout = ({children,}: Props) => {
    return (
       <>
            <Sidebar />
            <main className="pl-[256px] h-full">
                 <div className="bg-red-600">
                 {children}
                 </div>
            </main>
            </>
    );
};

export default MainLayout;