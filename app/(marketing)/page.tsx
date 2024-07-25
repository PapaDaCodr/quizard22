import  Image from "next/image"
import { ClerkLoading } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
export default function Home() {
 return(
  <div className="max-w-[980px] mx-auto flex-1 w-full justify-center p-4 gap-2 flex flex-col lg:flex-row items-center">
    <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb0">
        <Image src="/wizard.svg" fill alt = "Hero" />
    </div>
    <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold
        text-green-600 max-w-[480px] text-center">
          Learn, practice and have fun with Quizard
        </h1>
        <div>
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground and animate-spin" />
          </ClerkLoading>
        </div>
    </div>
  </div>
 )
}
