import { Like1 } from "iconsax-reactjs";
import { Link, useLocation } from "react-router";

export default function PostStats({localLikesCount,commentsCount,localSharesCount,fetchLikes,postId,}) {
    const location = useLocation();
    const isPostDetailsPage = location.pathname.includes(`/postDetails/${postId}`);
    return (
        <div className="flex justify-between items-center text-sm text-gray-500 pt-2">
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-700">
                <Like1 size="12" className="text-white" variant="Bold" />
                </div>
                <span onClick={fetchLikes} className="cursor-pointer hover:underline">{localLikesCount} likes</span>
            </div>
            <div className="flex items-center gap-4">
                <span>{commentsCount} comments</span>
                <span>{localSharesCount} shares</span>
                {!isPostDetailsPage && (
                <Link to={`/postDetails/${postId}`}
                    className="text-emerald-600 font-semibold hover:underline hover:text-emerald-700">
                    View details
                </Link>
                )}
            </div>
        </div>
    );
}