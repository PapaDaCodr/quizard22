"use client";

import { Check, Wand, Star } from "lucide-react";
import {CircularProgressbarWithChildren} from "react-circular-progressbar";
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
}: Props) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;
  
  if (cycleIndex == 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex == 4 ) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex == 6 ) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Wand : Star;

  const href = isCompleted ? '/lesson/${id}' : "/lesson"
  return (
    <Link 
      href={href}
      aria-disabled={locked}
      style={{pointerEvents: locked ? "none": "auto"}}
      >
      <div 
        className="relative"
        style={{
          right: '$(rightPosition)px',
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >


      </div>
    </Link>
  )
}