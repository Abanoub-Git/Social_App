import axios from "axios";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useNotifications(navigate) {
    const [activeTab, setActiveTab] = useState("all");
    const [markingId, setMarkingId] = useState(null);
    const queryClient = useQueryClient();

    //get notifications api call
    const { data: notifications = [], isLoading } = useQuery({
        queryKey: ["notifications", activeTab],
        queryFn: async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}notifications`,
            {
            params: {
                unread: activeTab === "unread",
                page: 1,
                limit: 20,
            },
            headers: {
                token: localStorage.getItem("token"),
            },
            }
        );
        return res.data.data.notifications || [];
        },
    });

    //mark one notification api call
    const markOneMutation = useMutation({
        mutationFn: (id) =>
        axios.patch(
            `${import.meta.env.VITE_BASE_URL}notifications/${id}/read`,
            {},
            {
            headers: {
                token: localStorage.getItem("token"),
            },
            }
        ),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
        },
        onError: (err) => {
        toast.error(err.response?.data?.message || "Mark failed");
        },
    });

    //mark all notifications api call
    const markAllMutation = useMutation({
        mutationFn: () =>
        axios.patch(
            `${import.meta.env.VITE_BASE_URL}notifications/read-all`,
            {},
            {
            headers: {
                token: localStorage.getItem("token"),
            },
            }
        ),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
        toast.success("All notifications marked as read");
        },
    });

    // open post details and mark notification as read 
    async function handleNotificationClick(notif) {
        const postId = notif.entityId || notif.entity?._id;
        if (!postId) return;
        try {
        if (!notif.isRead) {
            setMarkingId(notif._id);
            await markOneMutation.mutateAsync(notif._id);
        }
        navigate(`/postDetails/${postId}`);
        } catch (err) {
        console.log(err);
        } finally {
        setMarkingId(null);
        }
    }

    // mark notification as read without opening post details
    async function handleMarkOnly(notif) {
        try {
        setMarkingId(notif._id);
        await markOneMutation.mutateAsync(notif._id);
        if (activeTab === "unread") {
            queryClient.setQueryData(
            ["notifications", "unread"],
            (oldData = []) =>
                oldData.filter((n) => n._id !== notif._id)
            );
        }
        } catch (err) {
        console.log(err);
        } finally {
        setMarkingId(null);
        }
    }

    return {notifications,isLoading,activeTab,setActiveTab,markingId,markAllMutation,
        handleNotificationClick,
        handleMarkOnly,
    };
}