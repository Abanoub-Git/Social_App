import axios from "axios";
import { axiosInterceptos } from "../../Shared/axiosInterceptors/axiosInterceptors";
import { useQuery } from "@tanstack/react-query";

export default function usePostDetails(id) {

  function getSinglePostDetails() {
    return axios({
      url: `${import.meta.env.VITE_BASE_URL}posts/${id}`,
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  function getPostComment() {
    return axiosInterceptos.get(
      `posts/${id}/comments?page=1&limit=50`
    );
  }

  const { data: commentData, isLoading: commentLoading } =
    useQuery({
      queryKey: ["comments", id],
      queryFn: getPostComment,
      select: (data) => data.data.data.comments,
    });

  const { data, isLoading } = useQuery({
    queryKey: ["PostDetails", id],
    queryFn: getSinglePostDetails,
  });

  return {
    commentData: commentData || [],
    commentLoading,
    data,
    isLoading,
  };
}
