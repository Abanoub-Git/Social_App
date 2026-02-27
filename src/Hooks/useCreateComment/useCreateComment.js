import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInterceptos } from "../../Shared/axiosInterceptors/axiosInterceptors";
import toast from "react-hot-toast";

export default function useCreateComment(id, reset, contentValue) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const queryClient = useQueryClient();

    // send user comment
    function sendUserComment(data) {
        const formData = new FormData();
        if (data.content?.trim()) {
        formData.append("content", data.content.trim());
        }
        if (selectedImage) {
        formData.append("image", selectedImage);
        }
        return axiosInterceptos.post(`posts/${id}/comments`, formData);
    }


    const { mutateAsync, isPending } = useMutation({
        mutationFn: sendUserComment,
        onSuccess: () => {
        reset();
        setSelectedImage(null);
        setPreview(null);

        queryClient.invalidateQueries({
            queryKey: ["comments", id],
        });
        
        queryClient.invalidateQueries({
            queryKey: ["PostDetails", id],
        });
        
        queryClient.invalidateQueries({
            queryKey: ["allPosts"],
        });
        },
    });

    // handle submit comment
    function handleSubmitComment(data) {
        toast.promise(mutateAsync(data), {
        loading: "Comment Creating...",
        success: (res) => res.data.message,
        });
    }

    // handle image change
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
    }

    // remove image
    function removeImage() {
        setSelectedImage(null);
        setPreview(null);
    }

    // is disabled btn
    const isDisabled = isPending || ((contentValue?.trim()?.length || 0) < 2 && !selectedImage);

    return {
        handleSubmitComment,
        handleImageChange,
        removeImage,
        preview,
        isPending,
        isDisabled,
    };
}