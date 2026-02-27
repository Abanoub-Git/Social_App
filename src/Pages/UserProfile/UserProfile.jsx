import { useParams, useNavigate } from "react-router";
import axios from "axios";
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import PostCard from "../../Components/PostCard/PostCard";
import { useContext } from "react";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import UserProfileSkeleton from "./UserProfileSkeleton";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useContext(AuthUserContext);
  const queryClient = useQueryClient();

  


  // get user profile api call
  const {data: profileData,isLoading: profileLoading} = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () =>
      axios.get(
        `${import.meta.env.VITE_BASE_URL}users/${id}/profile`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      ),
  });

  const profile = profileData?.data?.data?.user;


  // get user posts api call
  const {data: postsData,isLoading: postsLoading} = useQuery({
    queryKey: ["userPosts", id],
    queryFn: () =>
      axios.get(
        `${import.meta.env.VITE_BASE_URL}users/${id}/posts`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      ),
  });

  const userPosts = postsData?.data?.data?.posts || [];





  
  // follow api call
  const followMutation = useMutation({
    mutationFn: () =>
      axios.put(
        `${import.meta.env.VITE_BASE_URL}users/${id}/follow`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      ),
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({
        queryKey: ["userProfile", id],
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });


  if (profileLoading || postsLoading) {
    return <UserProfileSkeleton />;
  }
  if (!profile) return null;


  // follow count and check is following
  const isFollowing =profile?.followers?.includes(userData?._id) || false;
  const followersCount =profile?.followers?.length || 0;


  // follow function
  function handleFollow() {
    followMutation.mutate();
  }

  const isMe = userData?._id === profile._id;


  return (
    <div className="min-h-screen pb-10">
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 cursor-pointer text-gray-700 bg-white px-5 py-3 rounded-xl shadow hover:bg-gray-50 md:-ms-12 transition"
        >
          ← Back to Home
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="relative rounded-3xl overflow-hidden shadow bg-linear-to-tr from-emerald-600 to-cyan-600/60">
          <div
            className="h-72 bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                profile.cover ||
                "https://images.unsplash.com/photo-1549921296-3a6b6e7b3d6b"
              })`,
            }}
          />
          <div className="absolute left-0 right-0 bottom-10 px-6">
            <div className="bg-white/95 backdrop-blur rounded-3xl shadow-lg p-9 w-85 md:w-full md:ms-0 -ms-4 relative">
              <div className="flex items-center gap-6">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="size-17 md:size-28 rounded-full border-4 border-white shadow object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold capitalize">
                    {profile.name}
                  </h2>
                  <p className="text-gray-500">
                    @{profile.name.toLowerCase()}
                  </p>
                  <div className="flex gap-6 mt-2 text-sm text-gray-600">
                    <span>
                      <b>{followersCount}</b> Followers
                    </span>
                    <span>
                      <b>{profile.following?.length || 0}</b> Following
                    </span>
                    <span>
                      <b>{userPosts.length}</b> Posts
                    </span>
                  </div>
                </div>
              </div>

              {!isMe && (
                <button
                  onClick={handleFollow}
                  disabled={followMutation.isPending}
                  className={`absolute md:top-8 md:right-8 top-2.5 right-59 cursor-pointer p-2 md:text-lg text-sm md:px-6 md:py-3 rounded-xl md:mt-8 font-semibold transition flex items-center gap-2 ${
                    isFollowing
                      ? "bg-emerald-200/70 text-emerald-700"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  } ${
                    followMutation.isPending
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {followMutation.isPending
                    ? "Updating..."
                    : isFollowing
                    ? "✓ Following"
                    : "+ Follow"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-28" />
      <div className="max-w-7xl mx-auto px-6 space-y-6 -mt-20">
        {userPosts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            No posts yet.
          </div>
        ) : (
          userPosts.map((post) => (
            <PostCard
              key={post._id}
              userPost={post}
              isOwner={userData?._id === post.user._id}
            />
          ))
        )}
      </div>
    </div>
  );
}