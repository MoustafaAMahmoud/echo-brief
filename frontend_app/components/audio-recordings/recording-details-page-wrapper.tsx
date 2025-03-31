"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RecordingDetailsPage } from "@/components/audio-recordings/recording-details-page";
import { AudioRecording } from "@/components/audio-recordings/audio-recordings-context";

interface RecordingDetailsPageWrapperProps {
  id: string;
}

export function RecordingDetailsPageWrapper({ id }: RecordingDetailsPageWrapperProps) {
  const router = useRouter();
  const [recording, setRecording] = useState<AudioRecording | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to get the recording from the cached data
    const cachedJobs = localStorage.getItem("cachedJobs");
    
    if (cachedJobs) {
      try {
        const jobs = JSON.parse(cachedJobs) as AudioRecording[];
        const job = jobs.find((job: AudioRecording) => job.id === id);
        
        if (job) {
          setRecording(job);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.error("Error parsing cached jobs:", e);
      }
    }
    
    // If we couldn't find the recording in the cache, redirect back to the list
    setError("Recording not found. Please try again from the recordings list.");
    setIsLoading(false);
    
    // Optional: Redirect back after a delay
    setTimeout(() => {
      router.push("/audio-recordings");
    }, 3000);
  }, [id, router]);

  if (isLoading) {
    return <div className="container mx-auto py-6 px-4">Loading recording details...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <p className="mt-2">
            <button 
              onClick={() => router.push("/audio-recordings")}
              className="text-blue-500 underline"
            >
              Return to recordings list
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (!recording) {
    return <div className="container mx-auto py-6 px-4">Recording not found</div>;
  }

  return <RecordingDetailsPage recording={recording} />;
} 