"use client";
import { useState, useEffect } from "react";
import { CalendarIcon, UserIcon } from "lucide-react";
import Link from "next/link";

function AboutPage({ space }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (space) setIsLoading(false);
  }, [space]);

  if (isLoading) {
    return (
      <div className="flex mt-32 justify-center h-screen bg-white">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!space) {
    return <div className="flex justify-center items-center h-screen">No space data available.</div>;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            {space.description}
          </p>

          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
              <UserIcon className="h-5 w-5" />
              <span className="font-medium">Creator:</span>
              <Link
                href={`/profile/${space.creator.username}`}
                className="text-primary hover:underline"
              >
                {space.creator.username}
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
              <CalendarIcon className="h-5 w-5" />
              <span>Created on {new Date(space.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;