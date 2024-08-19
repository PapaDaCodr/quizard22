"use client";

import { Check, Wand, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import "react-circular-progressbar/dist/styles.css"

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
}: Props) => {const cycleLength = 7;
  const cycleIndex = index % cycleLength;
  
  let indentationLevel;
  
  if (cycleIndex < 3) {
    indentationLevel = cycleIndex;
  } else {
    indentationLevel = 6 - cycleIndex;
  }
  
  const rightPosition = indentationLevel * 40;
  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Wand : Star;

  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <Link 
      href={href}
      aria-disabled={locked}
      style={{pointerEvents: locked ? "none": "auto"}}
    >
      <div 
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <div className="h-[102px] w-[102px] relative">
            <div className="absolute -top-6 left-2.5 px-3 border-2
            font-bold uppercase text-indigo-600 bg-white rounded-xl
            animate-bounce tracking-wide z-10">
              Start
              <div 
                className="absolute left-1/2 -bottom-2 w-0
                h-0 border-x-8 border-x-transparent
                border-t-0 transform -translate-x-1/2"
              />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: "indigo",
                },
                trail: {
                  stroke: "#white",
                },
                root: {
                  width: "100%",
                  height: "100%",
                }
              }}
            >
              <Button 
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className="h-[70px] w-[70px] rounded-full border-b-8 flex items-center justify-center"
              >
                <Icon 
                  className={cn(
                    "h-10 w-10",
                    locked
                    ? "fill-neutral-500 text-neutral-500 stroke-neutral-500"
                    : "fill-primary-foreground text-primary-foreground",
                    isCompleted && "fill-none stroke-[4]"
                  )}
                  />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <Button 
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className="h-[70px] w-[70px] rounded-full border-b-8 flex items-center justify-center"
              >
                <Icon 
                  className={cn(
                    "h-10 w-10",
                    locked
                    ? "fill-neutral-500 text-neutral-500 stroke-neutral-500"
                    : "fill-primary-foreground text-primary-foreground",
                    isCompleted && "fill-none stroke-[4]"
                  )}
                  />
              </Button>
        )}
      </div>
    </Link>
  );
};