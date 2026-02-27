import { Card } from "@heroui/react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { ExportSquare } from "iconsax-reactjs";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import CreateComment from "../CreateComment/CreateComment";
import PostHeader from "./PostHeader";
import PostStats from "./PostStats";
import PostActions from "./PostActions";
import PostModals from "./PostModals";
import usePostMutations from "../../Hooks/usePostMutations/usePostMutations";

export default function PostCard({ userPost, isOwner }) {
  const {
    createdAt,
    image,
    body,
    user: { name, photo },
    _id,
    commentsCount = 0,
    likesCount = 0,
    topComment,
  } = userPost;

  const { userData } = useContext(AuthUserContext);

  // stats
  const [showImageModal, setShowImageModal] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [likesUsers, setLikesUsers] = useState([]);
  const [shareText, setShareText] = useState("");
  const [isLiked, setIsLiked] = useState(userPost.likes?.includes(userData?._id));
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);
  const [localSharesCount, setLocalSharesCount] = useState(userPost.sharesCount || 0);

  useEffect(() => {
    setLocalSharesCount(userPost.sharesCount || 0);
  }, [userPost.sharesCount]);

  // likes reactes api call
  async function fetchLikes() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}posts/${_id}/likes?page=1&limit=20`,
        { headers: { token: localStorage.getItem("token") } }
      );
      setLikesUsers(data.data.likes || []);
      setShowLikesModal(true);
    } catch (err) {
      toast.error("Failed to load likes");
    }
  }

  // hooks
  const {
    likeMutation,
    handleBookmark,
    handleDelete,
    handleUpdate,
    handleShare,
  } = usePostMutations({
    postId: _id,
    userPost,
    editedBody,
    setIsEditing,
    setShowDeleteModal,
    setShowShareModal,
    setShareText,
    setLocalLikesCount,
    setIsLiked,
    setLocalSharesCount,
    likesCount,
  });

  return (
    <>
      <Card className="rounded-2xl shadow p-5 space-y-4 bg-white relative">
        <PostHeader
          userPost={userPost}
          photo={photo}
          name={name}
          createdAt={createdAt}
          isOwner={isOwner}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setIsEditing={setIsEditing}
          setShowDeleteModal={setShowDeleteModal}
          handleBookmark={handleBookmark}
        />

        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              className="w-full border border-gray-200 shadow-xl rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-1 border border-gray-200 cursor-pointer hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-1 bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          body && <p>{body}</p>
        )}

        {userPost.sharedPost ? (
          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-lg">
            <div className="p-4 flex justify-between items-start">
              <div className="flex gap-3">
                <img
                  src={userPost.sharedPost.user.photo}
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">
                    {userPost.sharedPost.user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(
                      userPost.sharedPost.createdAt
                    ).toLocaleDateString("en-CA")}
                  </p>
                </div>
              </div>
              <Link
                to={`/postDetails/${userPost.sharedPost._id}`}
                className="text-emerald-600 font-semibold text-xs hover:underline hover:text-emerald-700"
              >
                Original Post
                <ExportSquare size="12" className="inline ml-1 mb-0.5" />
              </Link>
            </div>
            <div className="px-4 pb-4 space-y-3">
              {userPost.sharedPost.body && (
                <p className="text-sm text-gray-800">
                  {userPost.sharedPost.body}
                </p>
              )}
              {userPost.sharedPost.image && (
                <img
                  src={userPost.sharedPost.image}
                  className="rounded-xl w-full"
                />
              )}
            </div>
          </div>
        ) : (
          image && (
            <img
              src={image}
              className="rounded-xl w-full cursor-pointer hover:opacity-95 transition"
              onClick={() => setShowImageModal(true)}
            />
          )
        )}

        <PostStats
          localLikesCount={localLikesCount}
          commentsCount={commentsCount}
          localSharesCount={localSharesCount}
          fetchLikes={fetchLikes}
          postId={_id}
        />

        <div className="border-t border-gray-200"></div>

        <PostActions
          isLiked={isLiked}
          likeMutation={likeMutation}
          showCommentBox={showCommentBox}
          setShowCommentBox={setShowCommentBox}
          setShowShareModal={setShowShareModal}
        />

        {topComment && (
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-4">
            <p className="text-xs uppercase text-gray-400 mb-2">
              TOP COMMENT
            </p>
            <div className="flex gap-3">
              <img
                src={topComment.commentCreator.photo}
                className="w-8 h-8 rounded-full"
              />
              <div className="bg-white rounded-xl px-3 py-2 flex-1">
                <p className="font-semibold text-sm">
                  {topComment.commentCreator.name}
                </p>
                {topComment.content && (
                  <p className="text-sm text-gray-700">
                    {topComment.content}
                  </p>
                )}
                {topComment.image && (
                  <img
                    src={topComment.image}
                    className="mt-2 rounded-xl max-h-40 object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {showCommentBox && <CreateComment id={_id} />}
      </Card>

      <PostModals
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDelete}
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        handleShare={handleShare}
        shareText={shareText}
        setShareText={setShareText}
        showImageModal={showImageModal}
        setShowImageModal={setShowImageModal}
        image={image}
        showLikesModal={showLikesModal}
        setShowLikesModal={setShowLikesModal}
        likesUsers={likesUsers}
      />
    </>
  );
}