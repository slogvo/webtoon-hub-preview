import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="pb-20">
      {/* Banner Skeleton */}
      <div className="relative h-[400px] overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full" />
        
        {/* Header/Nav Wrapper Skeleton */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Skeleton className="w-20 h-10 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Content Overlay Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="w-24 h-6 rounded-full mb-4" />
            <Skeleton className="w-3/4 md:w-1/2 h-12 mb-3" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-32 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Episode List Skeleton */}
          <div className="lg:col-span-2 space-y-0">
             {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border-b border-border">
                  <Skeleton className="shrink-0 w-20 h-14 rounded" />
                  <div className="grow min-w-0 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                  </div>
                  <div className="shrink-0 space-y-1 flex flex-col items-end">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
             ))}
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            {/* Stats */}
            <div className="flex items-center gap-6 mb-8 bg-secondary/30 p-4 rounded-2xl">
               <div className="flex items-center gap-2">
                 <Skeleton className="w-5 h-5 rounded-full" />
                 <Skeleton className="w-16 h-5" />
               </div>
               <div className="flex items-center gap-2">
                 <Skeleton className="w-5 h-5 rounded-full" />
                 <Skeleton className="w-16 h-5" />
               </div>
            </div>

            {/* Description */}
            <div className="mb-8 space-y-3">
              <Skeleton className="w-16 h-6 mb-3" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>

            {/* Actions */}
            <Skeleton className="w-full h-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
