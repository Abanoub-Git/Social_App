import { Like1, MessageText, Share } from "iconsax-reactjs";

export default function PostActions({isLiked,likeMutation,setShowCommentBox,showCommentBox,setShowShareModal,}) {
    return (
        <div className="flex justify-around text-sm font-medium text-gray-600">
        <button
            onClick={() => likeMutation.mutate()}
            className={`flex items-center gap-2 cursor-pointer hover:text-emerald-600 transition ${
            isLiked ? "text-emerald-600 font-semibold" : ""
            }`}
        >
            <Like1 size="18" variant={isLiked ? "Bold" : "Outline"} />
            Like
        </button>
        <button
            onClick={() => setShowCommentBox(!showCommentBox)}
            className="flex items-center gap-2 cursor-pointer hover:text-emerald-600 transition"
        >
            <MessageText size="18" />
            Comment
        </button>
        <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 cursor-pointer hover:text-emerald-600 transition"
        >
            <Share size="18" />
            Share
        </button>
        </div>
    );
}