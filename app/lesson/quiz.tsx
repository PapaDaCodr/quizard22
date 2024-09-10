"use client";

import { useState, useEffect } from "react";
import { Header } from "./header";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  // initialLessonChallenges: any[]; // Using any[] as a temporary solution
  userSubscription: any;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  // initialLessonChallenges,
  userSubscription,
}: Props) => {
  

  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);

  useEffect(() => {
    console.log("Quiz component mounted");
    // Any side effects or data fetching can go here
  }, []);

  return (
    <div>
      <Header 
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div>Quiz content goes here</div>
    </div>
  );
};