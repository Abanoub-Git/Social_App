import { Skeleton } from "@heroui/react";

export default function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow p-5 space-y-4">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-32 rounded-lg" />
          <Skeleton className="h-2 w-20 rounded-lg" />
        </div>
      </div>

      {/* Body */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full rounded-lg" />
        <Skeleton className="h-3 w-5/6 rounded-lg" />
        <Skeleton className="h-3 w-4/6 rounded-lg" />
      </div>

      {/* Image placeholder */}
      <Skeleton className="h-60 w-full rounded-2xl" />

      {/* Footer */}
      <div className="flex justify-between pt-3">
        <Skeleton className="h-3 w-16 rounded-lg" />
        <Skeleton className="h-3 w-24 rounded-lg" />
      </div>

    </div>
  );
}