import { More, Bookmark, Edit2, Trash } from "iconsax-reactjs";
import { useNavigate } from "react-router";

export default function PostHeader({userPost,photo,name,createdAt,isOwner,showMenu,setShowMenu,
    setIsEditing,
    setShowDeleteModal,
    handleBookmark,
    }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-start">
        <div
            className="flex gap-3 cursor-pointer"
            onClick={() => navigate(`/profile/${userPost.user._id}`)}
        >
            <img src={photo} className="size-12 rounded-full" />
            <div>
            <p className="font-semibold capitalize hover:underline">{name}</p>
            <p className="text-xs text-gray-500">
                {new Date(createdAt).toLocaleDateString("en-CA")}
            </p>
            </div>
        </div>
        <div className="relative">
            <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
            >
            <More size="18" />
            </button>
            {showMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50">
                <button
                onClick={() => handleBookmark(setShowMenu)}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                <Bookmark size="16" />
                Save post
                </button>

                {isOwner && (
                <>
                    <button
                    onClick={() => {
                        setIsEditing(true);
                        setShowMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                    <Edit2 size="16" />
                    Edit post
                    </button>
                    
                    <button
                    onClick={() => {
                        setShowDeleteModal(true);
                        setShowMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    >
                    <Trash size="16" />
                    Delete post
                    </button>
                </>
                )}
            </div>
            )}
        </div>
        </div>
    );
}