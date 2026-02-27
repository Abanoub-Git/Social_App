export default function UserProfileSkeleton() {
    return (
        <div className="min-h-screen pb-10 animate-pulse">
        <div className="max-w-6xl mx-auto px-6 pt-6">
            <div className="w-40 h-12 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-6">
            <div className="relative rounded-3xl overflow-hidden shadow bg-gray-200">
            <div className="h-72 bg-gray-300"></div>
            <div className="absolute left-0 right-0 bottom-10 px-6">
                <div className="bg-white rounded-3xl shadow-lg p-9 w-85 md:w-full md:ms-0 -ms-4 relative">
                <div className="flex items-center gap-6">
                    <div className="size-20 md:size-28 rounded-full bg-gray-300"></div>
                    <div className="space-y-3 w-full">
                    <div className="h-6 w-40 bg-gray-300 rounded"></div>
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                    <div className="flex gap-6 mt-2">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="h-28" />

        <div className="max-w-7xl mx-auto px-6 space-y-6 -mt-20">
            {Array.from({ length: 3 }).map((_, i) => (
            <div
                key={i}
                className="bg-white rounded-2xl shadow p-6 space-y-4"
            >
                <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-52 bg-gray-200 rounded-xl"></div>
            </div>
            ))}
        </div>
        </div>
    );
}