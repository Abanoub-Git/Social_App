import { Like1, MessageText, Share } from "iconsax-reactjs";

// helper function to get icon based on notification type
function getIcon(type) {
    switch (type) {
        case "like_post":
        return <Like1 size="18" className="text-red-500" />;
        case "comment_post":
        return <MessageText size="18" className="text-blue-500" />;
        case "share_post":
        return <Share size="18" className="text-emerald-600" />;
        default:
        return null;
    }
}

export default function NotificationItem({notif,markingId,handleNotificationClick,handleMarkOnly,}) 
{
    return (
        <div
        onClick={() => handleNotificationClick(notif)}
        className={`cursor-pointer p-4 sm:p-5 rounded-xl border transition
            flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
            ${notif.isRead
            ? "bg-white border-gray-200"
            : "bg-emerald-50 border-emerald-200"}
        `}
        >
        <div className="flex items-start sm:items-center gap-3 flex-1">
            <img
            src={notif.actor?.photo}
            alt={notif.actor?.name}
            className="w-10 h-10 rounded-full object-cover shrink-0"
            />

            <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-sm leading-relaxed">
                <span className="font-semibold whitespace-nowrap">
                {notif.actor?.name}
                </span>

                <span className="flex items-center gap-1 whitespace-nowrap">
                {getIcon(notif.type)}
                {notif.type === "like_post" && "liked your post"}
                {notif.type === "comment_post" && "commented on your post"}
                {notif.type === "share_post" && "shared your post"}
                </span>
            </div>

            <p className="text-xs text-gray-400 mt-1">
                {new Date(notif.createdAt).toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                })}
            </p>
            </div>
        </div>

        {!notif.isRead && (
            <button
            onClick={(e) => {
                e.stopPropagation();
                handleMarkOnly(notif);
            }}
            className="w-full sm:w-auto text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-lg transition"
            >
            {markingId === notif._id ? "Marking..." : "Mark as read"}
            </button>
        )}
        </div>
    );
}