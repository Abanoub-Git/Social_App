import { useNavigate } from "react-router";
import NotificationSkeleton from "./NotificationSkeleton";
import NotificationItem from "./NotificationItem";
import useNotifications from "../../Hooks/useNotifications/useNotifications";

export default function Notifications() {
  const navigate = useNavigate();

  const {notifications,isLoading,activeTab,setActiveTab,markingId,markAllMutation,
    handleNotificationClick,
    handleMarkOnly,
  } = useNotifications(navigate);

  return (
    <div className="p-4 mb-3">
      <title>Notifications</title>
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Notifications</h2>
            <p className="text-sm text-gray-500">
              Realtime updates for likes, comments, shares.
            </p>
          </div>
          <button
            onClick={() => markAllMutation.mutate()}
            className="px-4 py-2 -me-3 rounded-xl border border-gray-300 cursor-pointer hover:bg-gray-100"
          >
            {markAllMutation.isPending
              ? "Clearing..."
              : "Mark all as read"}
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 cursor-pointer rounded-2xl ${
              activeTab === "all"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`cursor-pointer px-4 py-2 rounded-2xl ${
              activeTab === "unread"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Unread
          </button>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <NotificationSkeleton key={i} />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 text-center text-gray-400">
            No notifications yet.
          </div>
        ) : (
          notifications.map((notif) => (
            <NotificationItem
              key={notif._id}
              notif={notif}
              markingId={markingId}
              handleNotificationClick={handleNotificationClick}
              handleMarkOnly={handleMarkOnly}
            />
          ))
        )}
      </div>
    </div>
  );
}