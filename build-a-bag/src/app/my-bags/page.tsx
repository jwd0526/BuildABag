"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import BuilderDashboard from './BuilderDashboard';
import { PageLoading } from '../components/Loading/Loading';

// Types
export interface Bag {
  _id: string;  // MongoDB uses _id by default
  id: string;   // Prisma maps this to _id
  name: string;
  description: string | null;
  userId: string;
  created: Date;
  lastModified: Date;
  clubs: any[]; // Replace with proper club type if needed
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
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated' && session?.user?.id) {
      fetchUserBags();
    }
  }, [status, session?.user?.id]);

  const fetchUserBags = async () => {
    if (!session?.user?.id) return;
    
    try {
      const response = await fetch(`/api/bags?userId=${session.user.id}`);
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

  const handleBagsUpdate = async (updatedBags: Bag[]) => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch('/api/bags', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          bags: updatedBags,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update bags');
      }

      setBags(updatedBags);
    } catch (err) {
      console.error('Failed to sync bags:', err);
      setError('Failed to update bags. Please try again.');
    }
  };

  if (status === 'loading' || isLoading) {
    return <PageLoading />;
  }

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

  if (!session?.user?.id) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#e7e7e7]">
      <div className="p-5">
        <BuilderDashboard 
          initialBags={bags}
          onBagsUpdate={handleBagsUpdate}
          userId={session.user.id}
        />
      </div>
    </div>
  );
};

export default MyBagsPage;