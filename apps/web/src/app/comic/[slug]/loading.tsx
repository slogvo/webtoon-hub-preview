import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* Banner Skeleton */}
      <Skeleton className="w-full aspect-[21/9] sm:aspect-[21/6]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Skeleton */}
          <Skeleton className="w-48 h-64 rounded-xl shrink-0 shadow-2xl" />
          
          <div className="flex-1 pt-20 flex flex-col gap-4">
            <Skeleton className="h-10 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        {/* Episode List Skeleton */}
        <div className="mt-12 space-y-4">
          <Skeleton className="h-8 w-40" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
