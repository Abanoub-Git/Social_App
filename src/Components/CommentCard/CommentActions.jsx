
export default function CommentActions({likes,isLiked,onLike,isLiking,onToggleReplies,showReplies}) {
    return (
        <div className="flex gap-4 text-xs mt-2">
        <button
            onClick={onLike}
            disabled={isLiking}
            className={`transition cursor-pointer ${
            isLiked
                ? "text-emerald-600 font-semibold"
                : "text-gray-500"
            } ${isLiking ? "opacity-50" : ""} hover:underline`}
        >
            {isLiking
            ? "Liking..."
            : `Like (${likes?.length || 0})`}
        </button>
        <button
            onClick={onToggleReplies}
            className="text-gray-500 hover:underline cursor-pointer"
        >
            {showReplies ? "Hide replies" : "Reply"}
        </button>
        </div>
    );
}