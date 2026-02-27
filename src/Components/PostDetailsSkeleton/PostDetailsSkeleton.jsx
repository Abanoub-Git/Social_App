export default function PostDetailsSkeleton() {
    return (
        <div className="max-w-3xl mx-auto mt-6 space-y-6 p-3 animate-pulse">

        {/* Back Button */}
        <div className="w-24 h-8 bg-gray-200 rounded-xl" />

        {/* Post Card Skeleton */}
        <div className="bg-white rounded-2xl shadow p-5 space-y-4">

            {/* Header */}
            <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="space-y-2">
                <div className="h-3 w-32 bg-gray-200 rounded" />
                <div className="h-2 w-20 bg-gray-200 rounded" />
            </div>
            </div>

            {/* Body */}
            <div className="space-y-2">
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
            </div>

            {/* Image */}
            <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>

        {/* Comments Box */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">

            <div className="h-4 w-32 bg-gray-200 rounded" />

            {/* Comment Skeletons */}
            {[1,2,3].map((i) => (
            <div key={i} className="flex gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                </div>
            </div>
            ))}

        </div>
        </div>
    );
}