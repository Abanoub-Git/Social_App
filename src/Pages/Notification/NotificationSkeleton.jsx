export default function NotificationSkeleton() {
  return (
    <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-pulse">

      {/* LEFT */}
      <div className="flex items-start sm:items-center gap-3 flex-1">

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />

        {/* Text */}
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-2 bg-gray-200 rounded w-1/3" />
        </div>

      </div>

      {/* Button placeholder */}
      <div className="w-28 h-8 bg-gray-200 rounded-lg" />

    </div>
  );
}