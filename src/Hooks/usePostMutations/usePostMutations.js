import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function usePostMutations({postId,userPost,editedBody,setIsEditing,setShowDeleteModal,
    setShowShareModal,
    setShareText,
    setLocalLikesCount,
    setIsLiked,
    setLocalSharesCount,
    likesCount,
    }) {
    const queryClient = useQueryClient();

    //like mutation (api call)
    const likeMutation = useMutation({
        mutationFn: () =>
        axios.put(
            `${import.meta.env.VITE_BASE_URL}posts/${postId}/like`,
            {},
            { headers: { token: localStorage.getItem("token") } }
        ),
        onMutate: async () => {
        setIsLiked((prev) => !prev);
        setLocalLikesCount((prev) =>
            userPost.likes?.includes(localStorage.getItem("userId"))
            ? prev - 1
            : prev + 1
        );
        },
        onError: () => {
        setIsLiked((prev) => !prev);
        setLocalLikesCount(likesCount);
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allPosts"] });
        },
    });

    //bookmark mutation (api call)
    const bookmarkMutation = useMutation({
        mutationFn: () =>
        axios.put(
            `${import.meta.env.VITE_BASE_URL}posts/${postId}/bookmark`,
            {},
            { headers: { token: localStorage.getItem("token") } }
        ),
    });

    //bookmark function for mutation implementation
    function handleBookmark(closeMenu) {
        toast.promise(bookmarkMutation.mutateAsync(), {
        loading: "Processing...",
        success: (res) => {
            queryClient.invalidateQueries({ queryKey: ["allPosts"] });
            queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
            if (closeMenu) closeMenu(false);
            return res.data.message;
        },
        error: "Something went wrong",
        });
    }

    //delete mutation (api call)
    const deleteMutation = useMutation({
        mutationFn: () =>
        axios.delete(
            `${import.meta.env.VITE_BASE_URL}posts/${postId}`,
            { headers: { token: localStorage.getItem("token") } }
        ),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allPosts"] });
        queryClient.invalidateQueries({ queryKey: ["myPosts"] });
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        setShowDeleteModal(false);
        },
    });

    //delete function for mutation implementation
    function handleDelete() {
        toast.promise(deleteMutation.mutateAsync(), {
        loading: "Deleting post...",
        success: (res) =>
            res.data.message || "Post deleted successfully",
        error: (err) =>
            err.response?.data?.message || "Delete failed",
        });
    }

    //update mutation (api call)
    const updateMutation = useMutation({
        mutationFn: () =>
        axios.put(
            `${import.meta.env.VITE_BASE_URL}posts/${postId}`,
            { body: editedBody },
            { headers: { token: localStorage.getItem("token") } }
        ),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allPosts"] });
        queryClient.invalidateQueries({ queryKey: ["myPosts"] });
        setIsEditing(false);
        },
    });

    //update function for mutation implementation
    function handleUpdate() {
        toast.promise(updateMutation.mutateAsync(), {
        loading: "Updating post...",
        success: (res) =>
            res.data.message || "Post updated successfully",
        error: (err) =>
            err.response?.data?.message || "Update failed",
        });
    }

    //share mutation (api call)
    const shareMutation = useMutation({
    mutationFn: (shareText) =>
        axios.post(
        `${import.meta.env.VITE_BASE_URL}posts/${postId}/share`,
        {
            body: shareText?.trim() || undefined,
        },
        { headers: { token: localStorage.getItem("token") } }
        ),
    onMutate: async () => {setLocalSharesCount((prev) => prev + 1)},
    onError: () => {setLocalSharesCount(userPost.sharesCount || 0)},
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allPosts"] });
        queryClient.invalidateQueries({
            queryKey: ["myPosts"],
        });
        queryClient.invalidateQueries({
            queryKey: ["bookmarks"],
        });
        },
    });

    //share function for mutation implementation
    function handleShare(shareText) {
    toast.promise(shareMutation.mutateAsync(shareText), {
        loading: "Sharing...",
        success: (res) => {
        setShowShareModal(false);
        setShareText("");
        return res.data.message || "Post shared successfully";
        },
        error: (err) =>
        err.response?.data?.message || "Share failed",
    });
    }

    return {likeMutation,handleBookmark,handleDelete,handleUpdate,handleShare};
}