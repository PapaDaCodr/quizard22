import  Image from "next/image"
import { ClerkLoading, 
        ClerkLoaded,
        SignUpButton,
        SignInButton,
        SignedIn,
        SignedOut
 } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import Link from "next/link"
export default function Home() {
 return(
  <div className="max-w-[980px] mx-auto flex-1 w-full justify-center p-4 gap-2 flex flex-col lg:flex-row items-center">
    <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb0">
        <Image src="/wizard.svg" fill alt = "Wizard" />
    </div>
    <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold
        text-green-600 max-w-[480px] text-center">
          Learn, practice and have fun with Quizard
        </h1>
        <div className="flex flex-col items-center
        gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground and animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal"fallbackRedirectUrl="/learn" signInFallbackRedirectUrl="/learn">
                <Button size="lg" variant="secondary"
                className="w-full"> 
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" fallbackRedirectUrl="/learn" signUpFallbackRedirectUrl="/learn" >
                <Button size="lg" variant="primaryOutline"
                className="w-full"> 
                  Already have an account?
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="primary">
                <Link href="/learn">
                Continue Learning
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
    </div>
  </div>
 )
}
