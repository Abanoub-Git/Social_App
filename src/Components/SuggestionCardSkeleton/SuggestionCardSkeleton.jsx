export default function SuggestionCardSkeleton() {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-200 bg-gray-100/30 rounded-xl animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-2 w-16 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="w-20 h-8 bg-gray-200 rounded-lg" />
    </div>
  );
}