import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInterceptos } from "../../Shared/axiosInterceptors/axiosInterceptors";

export default function useCommentMutations({postId,commentId,setIsEditing}) {
    const queryClient = useQueryClient();

    // Like
    const likeMutation = useMutation({
        mutationFn: () =>
        axiosInterceptos.put(
            `posts/${postId}/comments/${commentId}/like`
        ),
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["comments", postId],
        });
        },
    });

    // Delete
    const deleteMutation = useMutation({
        mutationFn: () =>
        axiosInterceptos.delete(
            `posts/${postId}/comments/${commentId}`
        ),
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["comments", postId],
        });
        },
    });

    // Update
    const updateMutation = useMutation({
        mutationFn: (editedContent) => {
        const formData = new FormData();
        formData.append("content", editedContent);
        return axiosInterceptos.put(
            `posts/${postId}/comments/${commentId}`,
            formData
        );
        },
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["comments", postId],
        });
        if (setIsEditing) {
            setIsEditing(false);
        }
        },
    });

    return {
        like: () => likeMutation.mutate(),
        isLiking: likeMutation.isPending,
        delete: () => deleteMutation.mutateAsync(),
        update: (content) => updateMutation.mutate(content),
        isUpdating: updateMutation.isPending,
    };
}