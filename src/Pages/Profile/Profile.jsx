import { useContext, useEffect, useRef, useState } from "react";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import { Message, User, Bookmark, Profile2User, Camera, Eye, DocumentText } from "iconsax-reactjs";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PostCard from "../../Components/PostCard/PostCard";

export default function Profile() {
  const { userData, getUserData } = useContext(AuthUserContext);
  const [activeTab, setActiveTab] = useState("posts");
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const coverInput = useRef();
  const profileInput = useRef();
  const queryClient = useQueryClient();

  useEffect(() => {
  if (userData?.name) {
    document.title = `${capitalize(userData.name)} Profile`;
  }
}, [userData]);


  //making profile title capatlize
  function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}


  //get my posts api call
  const { data: myPosts = [] } = useQuery({
  queryKey: ["myPosts", userData?._id],
  queryFn: () =>
    axios.get(`${import.meta.env.VITE_BASE_URL}posts`, {
      params: {
        user: userData?._id,
        page: 1,
        limit: 50,
      },
      headers: {
        token: localStorage.getItem("token"),
      },
    }),
  select: (data) => data.data.data.posts,
  enabled: !!userData?._id,
});


  //cover update api call
  async function handleCoverChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("cover", file);
    toast.promise(
      axios.put(
        `${import.meta.env.VITE_BASE_URL}users/upload-cover`,
        formData,
        { headers: { token: localStorage.getItem("token") } }
      ),
      {
        loading: "Updating cover...",
        success: ({ data }) => {
          getUserData();
          queryClient.invalidateQueries({ queryKey: ["myPosts", userData?._id] });
          return data.message;
        },
        error: (err) =>
          err?.response?.data?.error || "Something went wrong",
      }
    );
  }


  //profile photo update api call
  async function handleProfilePhoto(e) {
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    toast.promise(
      axios.put(
        `${import.meta.env.VITE_BASE_URL}users/upload-photo`,
        formData,
        { headers: { token: localStorage.getItem("token") } }
      ),
      {
        loading: "Updating profile image...",
        success: ({ data }) => {
          getUserData();
          return data.message;
        },
        error: (err) =>
          err?.response?.data?.error || "Something went wrong",
      }
    );
  }


  //get bookmarks api call
  function getBookmarks() {
  return axios.get(
    `${import.meta.env.VITE_BASE_URL}users/bookmarks`,
    {
      headers: { token: localStorage.getItem("token") },
    }
  );
}

  const {data: savedPostsData,} = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });

  const savedPosts = Array.isArray(savedPostsData?.data?.data?.bookmarks)? savedPostsData.data.data.bookmarks : [];

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-8 relative">
        <div
          className="h-75 rounded-3xl bg-cover bg-center relative group"
          style={{
            backgroundImage: `url(${userData?.cover || ""})`,
            backgroundColor: "#1f2937",
          }}>
          <div className="absolute top-4 right-4 hidden group-hover:flex gap-2">
            <button onClick={() => setShowCoverModal(true)}
              className="bg-black/60 text-white px-4 py-2 cursor-pointer rounded-xl text-sm flex items-center gap-1">
              <Eye size="16" /> View</button>
            <button onClick={() => coverInput.current.click()}
              className="bg-black/60 text-white px-4 py-2 cursor-pointer rounded-xl text-sm flex items-center gap-1">
              <Camera size="16" /> Change</button>
          </div>
        </div>
        <input type="file" ref={coverInput} onChange={handleCoverChange} className="hidden" />
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-28 relative z-10">
        <div className="bg-white rounded-b-3xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <img src={userData?.photo} alt="profile" className="size-28 rounded-full border-4 border-gray-300 shadow-lg object-cover"/>
                <div className="absolute inset-0 hidden group-hover:flex items-center justify-center gap-2 bg-black/50 rounded-full">
                  <button onClick={() => setShowProfileModal(true)} className="bg-white text-black cursor-pointer p-2 rounded-full">
                    <Eye size="18" />
                  </button>
                  <button onClick={() => profileInput.current.click()} className="bg-emerald-600 text-white cursor-pointer p-2 rounded-full">
                    <Camera size="18" />
                  </button>
                </div>
              </div>
              <input type="file" ref={profileInput} onChange={handleProfilePhoto} className="hidden" />
              <div>
                <h2 className="text-3xl font-bold">{userData?.name}</h2>
                <p className="text-gray-500">
                  @{userData?.name?.toLowerCase()}
                </p>
                <div className="mt-2 px-3 py-1 text-sm bg-emerald-100 text-emerald-600 rounded-full inline-block -ms-2">
                  <Profile2User size="16" className="inline mr-1" />
                  88 <span className="hidden md:inline">community</span> member
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl px-8 py-6 text-center md:w-36 w-34">
                <p className="text-sm text-gray-500 mb-1">FOLLOWERS</p>
                <p className="text-2xl font-bold">
                  {userData?.followersCount ?? 0}
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl px-8 py-6 text-center md:w-36 w-34">
                <p className="text-sm text-gray-500 mb-1">FOLLOWING</p>
                <p className="text-2xl font-bold">
                  {userData?.followingCount ?? 0}
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl px-8 py-6 text-center md:w-36 w-34">
                <p className="text-sm text-gray-500 mb-1">BOOKMARKS</p>
                <p className="text-2xl font-bold">{savedPosts.length}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="md:col-span-2  border border-gray-200 bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">About</h3>
              <div className="flex items-center gap-3 mb-3">
                <Message size="18" />
                {userData?.email}
              </div>
              <div className="flex items-center gap-3">
                <User size="18" />
                Active on 88 community
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-gray-200 rounded-2xl p-6">
                <p className="text-sm font-semibold text-emerald-600 mb-2">
                  MY POSTS
                </p>
                <p className="text-2xl font-bold">
                  {myPosts.length}
                </p>
              </div>
              <div className="bg-emerald-50 border border-gray-200 rounded-2xl p-6">
                <p className="text-sm font-semibold text-emerald-600 mb-2">
                  SAVED POSTS
                </p>
                <p className="text-2xl font-bold">
                  {savedPosts.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="bg-white rounded-2xl shadow p-3 flex justify-between items-center">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            <button onClick={() => setActiveTab("posts")}
              className={`px-4 py-2 rounded-lg text-sm  transition cursor-pointer font-semibold ${
                activeTab === "posts" ? "bg-white shadow text-emerald-600" : "text-gray-600"}`}>
              <DocumentText size="16" className="inline mr-1" />
              My Posts
            </button>
            <button onClick={() => setActiveTab("saved")}
              className={`px-4 py-2 rounded-lg text-sm cursor-pointer font-semibold transition ${
                activeTab === "saved" ? "bg-white shadow text-emerald-600" : "text-gray-600"
              }`}
            >
              <Bookmark size="16" className="inline mr-1" />
              Saved
            </button>
          </div>
          <div className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full">
            {activeTab === "posts" ? myPosts.length : savedPosts.length}
          </div>
        </div>
        <div className="mt-6 space-y-6">
          {activeTab === "posts" &&
            (myPosts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
                You have not posted yet.
              </div>
            ) : (myPosts.map((post) => (
                  <PostCard key={post._id}userPost={post}isOwner={true}/>
                  ))
                ))}
          {activeTab === "saved" &&
          (savedPosts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
              No saved posts yet.
            </div>
          ) : (
            savedPosts.map((post) => (
              <PostCard key={post._id}userPost={post}isOwner={false}/>
            ))
          ))}
        </div>
      </div>

    {showCoverModal && (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <button onClick={() => setShowCoverModal(false)}
          className="absolute top-6 right-6 cursor-pointer bg-white/20 hover:bg-white/40 text-white size-10 rounded-full flex items-center justify-center text-xl">
          ✕</button>
        <img src={userData?.cover} alt="cover" className="max-h-[90%] rounded-4xl p-5" />
      </div>
    )}

    {showProfileModal && (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <button onClick={() => setShowProfileModal(false)}
          className="absolute top-6 right-6 cursor-pointer bg-white/20 hover:bg-white/40 text-white size-10 rounded-full flex items-center justify-center text-xl">
          ✕</button>
        <img src={userData?.photo} alt="profile" className="max-h-[90%] rounded-4xl p-5" />
      </div>
    )}
    </div>
  );
}
