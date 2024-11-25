// page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import BuilderDashboard from './BuilderDashboard';
import Nav from '../components/Nav/Nav';
import { PageLoading, ProfileSkeleton } from '../components/Loading/Loading';
import { PrismaClient } from '@prisma/client';

// Types
interface Bag {
  id: string;
  name: string;
  description: string;
  userId: string;
  created: Date;
  lastModified: Date;
  clubs: any[]; // Replace with proper club type
}

interface ApiResponse {
  success: boolean;
  data?: Bag[];
  error?: string;
}

const MyBagsPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bags, setBags] = useState<Bag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    // Fetch bags if authenticated
    if (status === 'authenticated' && session?.user?.id) {
      fetchUserBags();
    }
  }, [status, session?.user?.id]);

  const fetchUserBags = async () => {
    try {
      const response = await fetch(`/api/bags?userId=${session?.user?.id}`);
      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch bags');
      }

      if (result.data) {
        setBags(result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching bags');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while session is loading
  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-[#e7e7e7]">
        <div className="p-5">
        </div>
        <PageLoading />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#e7e7e7]">
        <div className="p-5">
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
              <button 
                className="bg-[#bec8e1] text-[#2c2c2c] font-bold py-2 px-4 rounded mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show authenticated content
  return (
    <div className="min-h-screen bg-[#e7e7e7]">
      <div className="p-5 z-10">
        <BuilderDashboard 
          initialBags={bags}
          onBagsUpdate={async (updatedBags) => {
            // Here you would typically sync with the backend
            try {
              await fetch('/api/bags/sync', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: session?.user?.id,
                  bags: updatedBags,
                }),
              });
            } catch (err) {
              console.error('Failed to sync bags:', err);
              // Optionally show an error toast/notification
            }
          }}
        />
      </div>
      <div className="absolute inset-0 z-0 flex justify-end items-center rotate-45 mb-[60vh] mr-[20vw]">
        <img
          className="w-[30vw] mr-20 opacity-15 z-0"
          src="logo.svg"
          alt="Golf Bag Logo"
        />
      </div>
    </div>
  );
};

export default MyBagsPage;