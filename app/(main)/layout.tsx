
import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
type Props ={
    children: React.ReactNode;
};

const MainLayout = ({children,}: Props) => {
    return (
       <>
            <MobileHeader />
            <Sidebar className="hidden lg:flex" />
            <main className="pl-[256px] h-full pt-[50px] lg:pt-0">
                 <div className="bg-red-600">
                 {children}
                 </div>
            </main>
            </>
    );
};

export default MainLayout;