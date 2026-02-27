// =========================== solve API soon for edit and delete ========================

import { Avatar } from "@heroui/react";
import { useState, useContext } from "react";
import { More, Edit2, Trash } from "iconsax-reactjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInterceptos } from "../../Shared/axiosInterceptors/axiosInterceptors";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import toast from "react-hot-toast";

export default function ReplyItem({ reply, postId, commentId }) {
  const queryClient = useQueryClient();
  const { userData } = useContext(AuthUserContext);
  const {_id,content,createdAt,commentCreator: { name, photo, _id: creatorId },} = reply;
  const isOwner = userData?._id === creatorId;
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

//   //  Delete Reply
//  const deleteMutation = useMutation({
//   mutationFn: () =>
//     axiosInterceptos.delete(
//       `posts/comments/replies/${_id}`
//     ),
//   onSuccess: () => {
//     setShowMenu(false);
//     queryClient.invalidateQueries({
//       queryKey: ["replies", commentId],
//     });
//   },
// });

//   //  Update Reply
//   const updateMutation = useMutation({
//   mutationFn: () => {
//     const formData = new FormData();
//     formData.append("content", editedContent);

//     return axiosInterceptos.put(
//       `posts/comments/replies/${_id}`,
//       formData
//     );
//   },
//   onSuccess: () => {
//     setIsEditing(false);
//     queryClient.invalidateQueries({
//       queryKey: ["replies", commentId],
//     });
//   },
// });



  return (
    <div className="flex gap-2 relative">
      <Avatar src={photo} size="sm" radius="full" />
      <div className="bg-gray-200 rounded-xl px-3 py-2 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <span className="text-xs text-gray-400">
              {new Date(createdAt).toLocaleDateString("en-CA")}
            </span>
          </div>
          {isOwner && (
            <button onClick={() => setShowMenu(!showMenu)}>
              <More size={16} />
            </button>
          )}
        </div>
        {isEditing ? (
          <div className="flex gap-2 mt-2">
            <input
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="flex-1 border rounded-xl px-2 py-1 text-sm"
            />
            <button
              onClick={() => updateMutation.mutate()}
              disabled={updateMutation.isPending}
              className="text-emerald-600 text-sm"
            >
              {updateMutation.isPending ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-700 mt-1">{content}</p>
        )}

        {showMenu && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 text-sm z-30 hidden">
            <button
              onClick={() => {
                setIsEditing(true);
                setShowMenu(false);
              }}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            >
              <Edit2 size={14} className="inline mr-2" />
              Edit
            </button>
            <button
              onClick={() =>
                toast.promise(deleteMutation.mutateAsync(), {
                  loading: "Deleting...",
                  success: "Reply deleted",
                })
              }
              className="block w-full mt-2 text-left px-2 py-1 text-red-600 hover:bg-gray-100"
            >
              <Trash size={14} className="inline mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}