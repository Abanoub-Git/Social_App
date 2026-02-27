import { Avatar } from "@heroui/react";
import { useContext, useState } from "react";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import CommentHeader from "./CommentHeader";
import CommentContent from "./CommentContent";
import CommentActions from "./CommentActions";
import CommentReplies from "./CommentReplies";
import useCommentMutations from "../../Hooks/useCommentMutations/useCommentMutations";

export default function CommentCard({ comment, postId }) {
  const {_id,createdAt,commentCreator: { name, photo, _id: creatorId },content,likes,image,} = comment;
  const { userData } = useContext(AuthUserContext);
  const isOwner = userData?._id === creatorId;
  const isLiked = likes?.includes(userData?._id);
  const [showReplies, setShowReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const mutations = useCommentMutations({
    postId,
    commentId: _id,
    setIsEditing,
  });

  return (
    <div className="flex gap-3 mt-3 bg-gray-100 p-4 rounded-2xl relative">
      <Avatar src={photo} radius="full" size="sm" />
      <div className="flex-1">
        <CommentHeader
          name={name}
          createdAt={createdAt}
          isOwner={isOwner}
          onDelete={mutations.delete}
          onEdit={() => setIsEditing(true)}
        />

        <CommentContent
          content={content}
          image={image}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onUpdate={mutations.update}
          isUpdating={mutations.isUpdating}
        />

        <CommentActions
          likes={likes}
          isLiked={isLiked}
          onLike={mutations.like}
          isLiking={mutations.isLiking}
          onToggleReplies={() => setShowReplies(!showReplies)}
          showReplies={showReplies}
        />

        {showReplies && (
          <CommentReplies
            postId={postId}
            commentId={_id}
          />
        )}
      </div>
    </div>
  );
}