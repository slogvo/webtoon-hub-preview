import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header Skeleton */}
      <div className="w-full h-16 border-b border-border flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* Panels Skeleton */}
      <main className="w-full max-w-3xl py-8 space-y-4">
        <Skeleton className="w-full aspect-[3/4]" />
        <Skeleton className="w-full aspect-[3/4]" />
        <Skeleton className="w-full aspect-[3/4]" />
      </main>
    </div>
  );
}
