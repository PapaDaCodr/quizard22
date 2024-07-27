import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

type Props ={
activeCourse: {imageSrc: string; title: string}; // TODO: Replace with DB types
hearts: number;
points: number;
hasActiveSubscription: boolean;
}

export const UserProgress =({ activeCourse }: Props)  => {
      return (
        <div className="flex item-center justify-between gap-x-2 w-full">
          <Link href="/courses">
          <Button >
              <Image src={activeCourse.imageSrc}
                alt={activeCourse.title}
                className="rounded-md border"
                width={32}
                height={32}
              />
          </Button>
          </Link>
        </div>
      )
}