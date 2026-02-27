import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "iconsax-reactjs";
import { useState } from "react";
import usePostDetails from "../../Hooks/usePostDetails/usePostDetails";
import CommentCard from "../../Components/CommentCard/CommentCard";
import CreateComment from "../../Components/CreateComment/CreateComment";
import PostCard from "../../Components/PostCard/PostCard";
import PostDetailsSkeleton from "../../Components/PostDetailsSkeleton/PostDetailsSkeleton";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const { isLoading, commentLoading, commentData, data } =usePostDetails(id);

  if (isLoading || commentLoading) {
    return <PostDetailsSkeleton />;
  }

  const post = data.data.data.post;

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6 p-3">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer bg-white shadow px-4 py-2 rounded-xl hover:bg-gray-50"
      >
        <ArrowLeft size="18" />
        Back
      </button>

      <PostCard userPost={post} />
      <div className="bg-white rounded-2xl shadow p-6 mb-10">
        <div className="flex justify-between mb-6">
          <h3 className="font-semibold text-lg">
            Comments{" "}
            <span className="text-emerald-600">
              {commentData.length}
            </span>
          </h3>
          <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm">
            Most relevant
          </div>
        </div>

        {!showAll && commentData.length > 0 && (
          <>
            <p className="text-xs uppercase text-gray-400 mb-2">
              Top Comment
            </p>
            <CommentCard
              comment={commentData[0]}
              postId={id}
            />
            {commentData.length > 1 && (
              <button
                onClick={() => setShowAll(true)}
                className="text-emerald-600 mt-3 text-sm hover:underline cursor-pointer hover:text-emerald-700 font-semibold"
              >
                View all comments
              </button>
            )}
          </>
        )}

        {showAll &&
          commentData.map((c) => (
            <CommentCard
              key={c._id}
              comment={c}
              postId={id}
            />
          ))}
        {commentData.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No comments yet
          </div>
        )}
        <div className="mt-6">
          <CreateComment id={id} />
        </div>
      </div>
    </div>
  );
}
