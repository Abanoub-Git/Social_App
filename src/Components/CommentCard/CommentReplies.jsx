import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInterceptos } from "../../Shared/axiosInterceptors/axiosInterceptors";
import ReplyItem from "../ReplyItem/ReplyItem";

export default function CommentReplies({postId,commentId}) {
    const queryClient = useQueryClient();
    const [replyText, setReplyText] = useState("");

    //get replies api
    const { data: replies = [] } = useQuery({
        queryKey: ["replies", commentId],
        queryFn: () =>
        axiosInterceptos.get(
            `posts/${postId}/comments/${commentId}/replies?page=1&limit=10`
        ),
        select: (res) => res.data.data.replies,
    });
    
    //post replies api
    const replyMutation = useMutation({
        mutationFn: (replyText) => {
            const formData = new FormData();
            formData.append("content", replyText);
            return axiosInterceptos.post(
            `posts/${postId}/comments/${commentId}/replies`,
            formData
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
            queryKey: ["replies", commentId],
            });
        },
    });

    return (
        <div className="mt-4 pl-6 border-l border-gray-300 space-y-3">
        {replies.map((reply) => (
            <ReplyItem
            key={reply._id}
            reply={reply}
            postId={postId}
            commentId={commentId}
            />
        ))}
        <div className="flex gap-2 mt-3">
            <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm"
            />
            <button
                onClick={() => {
                    if (!replyText.trim()) return;
                    replyMutation.mutate(replyText);
                    setReplyText("");
                }}
                disabled={replyMutation.isPending}
                className={`text-emerald-600 text-sm font-semibold cursor-pointer
                    ${replyMutation.isPending ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
                >
                {replyMutation.isPending ? "Sending..." : "Send"}
            </button>
        </div>
        </div>
    );
}