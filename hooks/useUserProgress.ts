// hooks/useUserProgress.ts
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from "@clerk/nextjs";
import { UserProgres } from '@/components/user-progress';

export function useUserProgress() {
  const { userId } = useAuth();
  const [userProgress, setUserProgress] = useState<typeof UserProgres | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUserProgress();
    }
  }, [userId]);

  const fetchUserProgress = async () => {
    if (!userId) {
      setUserProgress(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('../api/user-progress.ts');
      if (!response.ok) {
        throw new Error('Failed to fetch user progress');
      }
      const data = await response.json();
      setUserProgress(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUserProgress(null);
    } finally {
      setLoading(false);
    }
  };

  return { userProgress, loading, error, refetch: fetchUserProgress };
}