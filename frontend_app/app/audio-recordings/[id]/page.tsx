import { RecordingDetailsPageWrapper } from "@/components/audio-recordings/recording-details-page-wrapper";

/**
 * This function is required for Next.js static export with dynamic routes.
 * 
 * When using `output: 'export'` in next.config.js, Next.js requires all possible
 * dynamic route parameters to be known at build time. Since our application deals
 * with dynamically created audio recording IDs, we provide placeholder IDs here
 * to satisfy this requirement.
 * 
 * The IDs listed here will be pre-rendered at build time. For all other IDs,
 * the pages will be generated on-demand at runtime thanks to the `dynamicParams: true`
 * configuration.
 * 
 * In a production environment, you might want to replace these placeholder IDs
 * with your most frequently accessed recording IDs for better performance.
 */
export async function generateStaticParams() {
  return [
    // Placeholder ID for static export requirements
    { id: 'job_placeholder_123456789' },
    
    // You can add more frequently accessed IDs here
    // { id: 'job_1743038577396' },
    // { id: 'job_1743038509158' },
  ];
}

/**
 * Enable dynamic parameters that aren't specified in generateStaticParams.
 * This allows the application to handle any job ID at runtime, even if
 * they're not explicitly listed above.
 */
export const dynamicParams = true;

/**
 * The main page component for displaying details of a specific audio recording.
 * This component receives the dynamic route parameter (id) and passes it to
 * the client component that handles the data fetching and rendering.
 */
export default function Page({ params }: { params: { id: string } }) {
  return <RecordingDetailsPageWrapper id={params.id} />;
} 