import { useState } from "react";

export default function CommentContent({content,image,isEditing,setIsEditing,onUpdate,isUpdating}) {
    const [editedContent, setEditedContent] = useState(content);

    if (isEditing) {
        return (
        <div className="flex gap-2 mt-2">
            <input
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            disabled={isUpdating}
            className="flex-1 border border-gray-300 rounded-xl p-2 text-sm disabled:opacity-50"
            />
            <button
            onClick={() => onUpdate(editedContent)}
            disabled={isUpdating}
            className={`text-sm font-semibold cursor-pointer ${
                isUpdating
                ? "text-gray-400"
                : "text-emerald-600 hover:underline"
            }`}
            >
            {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
            onClick={() => setIsEditing(false)}
            disabled={isUpdating}
            className="text-gray-500 text-sm cursor-pointer"
            >
            Cancel
            </button>
        </div>
        );
    }

    return (
        <>
        <p className="text-sm text-gray-700 mt-2">
            {content}
        </p>
        {image && (
            <img
            src={image}
            className="mt-2 rounded-xl max-h-60"
            />
        )}
        </>
    );
}