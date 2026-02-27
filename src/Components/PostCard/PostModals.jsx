export default function PostModals({
    showDeleteModal,
    setShowDeleteModal,
    handleDelete,
    showShareModal,
    setShowShareModal,
    handleShare,
    shareText,
    setShareText,
    showImageModal,
    setShowImageModal,
    image,
    showLikesModal,
    setShowLikesModal,
    likesUsers,
    }) {
    return (
        <>
        {showDeleteModal && (
            <div className="fixed -inset-10 bg-black/60 flex items-center justify-center z-50 p-15 md:p-0">
            <div className="bg-white rounded-2xl p-6 w-100 h-45 space-y-4 shadow-xl">
                <h3 className="text-lg font-semibold">
                Delete this post?
                </h3>
                <p className="text-sm text-gray-500">
                Are You Sure About This Action ?!
                </p>
                <div className="flex justify-end gap-3 mt-7">
                <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                >
                    Delete
                </button>
                </div>
            </div>
            </div>
        )}

        {showShareModal && (
            <div className="fixed -inset-6 bg-black/50 flex items-center p-10 md:p-6 justify-center z-50">
            <div className="bg-white rounded-2xl w-112.5 p-6 space-y-4 shadow-xl">
                <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Share post</h3>
                <button
                    onClick={() => setShowShareModal(false)}
                    className="cursor-pointer"
                >
                    ✖
                </button>
                </div>
                <textarea
                placeholder="Say something about this... (optional)"
                value={shareText}
                onChange={(e) => setShareText(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={3}
                />
                <div className="flex justify-end gap-3">
                <button
                    onClick={() => setShowShareModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    onClick={() => handleShare(shareText)}
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700"
                >
                    Share now
                </button>
                </div>
            </div>
            </div>
        )}

        {showLikesModal && (
            <div className="fixed -inset-10 bg-black/50 flex items-center p-15 md:p-5 justify-center z-50">
            <div className="bg-white rounded-2xl w-96 h-50 p-6 shadow-xl">
                <div className="flex justify-between mb-4">
                <h3 className="font-semibold">People who reacted</h3>
                <button
                    onClick={() => setShowLikesModal(false)}
                    className="cursor-pointer"
                >
                    ✖
                </button>
                </div>
                {likesUsers.length === 0 ? (
                <p className="text-sm text-gray-400">No likes yet</p>
                ) : (
                likesUsers.map((user) => (
                    <div key={user._id} className="flex items-center gap-3 py-2">
                    <img
                        src={user.photo}
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">
                        @{user.name}
                        </p>
                    </div>
                    </div>
                ))
                )}
            </div>
            </div>
        )}

        {showImageModal && (
            <div className="fixed -inset-10 bg-black/90 flex items-center justify-center p-15 md:p-5 z-100">
            <button
                onClick={() => setShowImageModal(false)}
                className="cursor-pointer absolute top-17 right-18 text-white text-3xl font-bold hover:scale-110 transition"
            >
                ✕
            </button>
            <img
                src={image}
                className="max-h-[90%] max-w-[90%] rounded-2xl shadow-2xl mt-10"
            />
            </div>
        )}
        </>
    );
}