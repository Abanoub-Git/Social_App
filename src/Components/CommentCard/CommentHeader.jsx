import { useState } from "react";
import { More, Trash, Edit2 } from "iconsax-reactjs";
import toast from "react-hot-toast";

export default function CommentHeader({name,createdAt,isOwner,onDelete,onEdit}) {
    const [showMenu, setShowMenu] = useState(false);

    const handleDelete = async () => {
        setShowMenu(false);      
        await toast.promise(onDelete(), {
        loading: "Deleting...",
        success: "Comment deleted",
        error: "Something went wrong",
        });
    };

    return (
        <div className="flex justify-between items-start relative">
        <div>
            <p className="font-semibold text-sm capitalize">{name}</p>
            <p className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleDateString("en-CA")}
            </p>
        </div>

        {isOwner && (
            <>
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-500 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition"
            >
                <More size={18} />
            </button>

            {showMenu && (
                <div className="absolute right-2 top-10 bg-white shadow-lg rounded-lg p-3 w-32 text-sm z-30">
                
                <button
                    onClick={() => {
                    onEdit();
                    setShowMenu(false);
                    }}
                    className="flex cursor-pointer items-center gap-2 w-full px-2 py-1 hover:bg-gray-100"
                >
                    <Edit2 size={16} />
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="flex cursor-pointer items-center gap-2 w-full mt-2 px-2 py-1 text-red-600 hover:bg-gray-100"
                >
                    <Trash size={16} />
                    Delete
                </button>
                </div>
            )}
            </>
        )}
        </div>
    );
}