import React from 'react';
import { Loader2 } from "lucide-react";

// Reusable loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
  </div>
);

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
}
  
const LoadingButton: React.FC<LoadingButtonProps> = ({
    children,
    loading = false,
    disabled = false,
    className = "",
    ...props
}) => (
    <button
        className={`relative flex items-center justify-center ${
            loading ? "text-transparent" : ""
        } ${className}`}
        disabled={disabled || loading}
        {...props}
    >
        {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin" />
            </div>
        )}
        {children}
    </button>
);

// Full page loading state
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-500" />
      <p className="mt-2 text-gray-600">Loading...</p>
    </div>
  </div>
);

// Skeleton loader for profile section
const ProfileSkeleton = () => (
  <div className="space-y-4 p-4">
    <div className="flex items-center space-x-4">
      <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
      <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
    </div>
  </div>
);

export { LoadingSpinner, LoadingButton, PageLoading, ProfileSkeleton };