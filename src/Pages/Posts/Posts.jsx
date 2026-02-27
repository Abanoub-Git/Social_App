import axios from "axios";
import { useContext, useState } from "react";
import PostCard from "../../Components/PostCard/PostCard";
import CreatePost from "../../Components/CreatePost/CreatePost";
import { useQuery } from "@tanstack/react-query";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import { Bookmark, Global, Profile2User } from "iconsax-reactjs";
import SuggestFollowers from "../../Components/SuggestFollowers/SuggestFollowers";
import PostCardSkeleton from "../../Components/PostCardSkeleton/PostCardSkeleton";

export default function Posts() {
  const { userData } = useContext(AuthUserContext);
  const [activeTab, setActiveTab] = useState("community");


  // get all posts api call
  function getAllPosts() {
  return axios.get(
    `${import.meta.env.VITE_BASE_URL}posts?page=1&limit=300`,
    {
      headers: { token: localStorage.getItem("token") },
    }
  );
}

  const {data: posts = [],isLoading,isError,} = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
    select: (res) => res.data.data.posts,
  });


  // get my posts api call
  const { data: myPosts = [] } = useQuery({
  queryKey: ["myPosts", userData?._id],
  queryFn: () =>
    axios.get(`${import.meta.env.VITE_BASE_URL}posts`, {
      params: {
        user: userData?._id,
        page: 1,
        limit: 100,
      },
      headers: {
        token: localStorage.getItem("token"),
      },
    }),
  select: (res) => res.data.data.posts,
  enabled: !!userData?._id,
});


  // get bookmarks api call
  function getBookmarks() {
    return axios.get(
      `${import.meta.env.VITE_BASE_URL}users/bookmarks`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  }

  const { data: bookmarksResponse } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });

  const savedPosts = Array.isArray(
    bookmarksResponse?.data?.data?.bookmarks
  )
    ? bookmarksResponse.data.data.bookmarks
    : [];


  // loading 
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto mt-6 px-4 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <h1 className="text-center text-3xl mt-10">
        Something went wrong
      </h1>
    );
  }


  return (
  <div className="max-w-7xl mx-auto mt-6 grid grid-cols-12 gap-6 px-4 pb-10">
    <title>Home Page</title>
    <div className="col-span-12 md:hidden space-y-4">
      <div className="bg-white rounded-2xl shadow p-3 grid grid-cols-2 gap-3">
        <div
          onClick={() => setActiveTab("myposts")}
          className={`flex items-center gap-2 justify-center p-3 rounded-xl cursor-pointer transition
            ${
              activeTab === "myposts"
                ? "bg-emerald-100/60 text-emerald-600 font-semibold"
                : "bg-gray-100 text-gray-700"
            }`}
        >
          <Profile2User size="18" />
          My Posts
        </div>
        <div
          onClick={() => setActiveTab("community")}
          className={`flex items-center gap-2 justify-center p-3 rounded-xl cursor-pointer transition
            ${
              activeTab === "community"
                ? "bg-emerald-100/60 text-emerald-600 font-semibold"
                : "bg-gray-100 text-gray-700"
            }`}
        >
          <Global size="18" />
          Community
        </div>
        <div
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2 justify-center p-3 rounded-xl cursor-pointer transition
            ${
              activeTab === "saved"
                ? "bg-emerald-100/60 text-emerald-600 font-semibold"
                : "bg-gray-100 text-gray-700"
            }`}
        >
          <Bookmark size="18" />
          Saved
        </div>
      </div>
      <SuggestFollowers limit={5} />
    </div>



    <div className="col-span-3 hidden md:block">
      <div className="bg-white rounded-2xl shadow p-4 space-y-2">
        <div
          onClick={() => setActiveTab("community")}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
            ${
              activeTab === "community"
                ? "bg-emerald-100/50 text-emerald-600 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          <Global size="20" />
          Community
        </div>
        <div
          onClick={() => setActiveTab("myposts")}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
            ${
              activeTab === "myposts"
                ? "bg-emerald-100/50 text-emerald-600 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          <Profile2User size="20" />
          My Posts
        </div>
        <div
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
            ${
              activeTab === "saved"
                ? "bg-emerald-100/50 text-emerald-600 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          <Bookmark size="20" />
          Saved
        </div>
      </div>
    </div>

    <div className="col-span-12 md:col-span-6 space-y-6">
      <CreatePost />

      {activeTab === "myposts" &&
        (myPosts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            No posts yet.
          </div>
        ) : (
          myPosts.map((post) => (
            <PostCard
              key={post._id}
              userPost={post}
              isOwner={true}
            />
          ))
        ))}

      {activeTab === "community" &&
        posts.map((post) => (
          <PostCard
            key={post._id}
            userPost={post}
            isOwner={post.user._id === userData?._id}
          />
        ))}

      {activeTab === "saved" &&
        (savedPosts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            No saved posts yet.
          </div>
        ) : (
          savedPosts.map((post) => (
            <PostCard
              key={post._id}
              userPost={post}
              isOwner={false}
            />
          ))
        ))}
    </div>
    <div className="col-span-3 hidden md:block">
      <SuggestFollowers limit={5} />
    </div>
  </div>
);
}