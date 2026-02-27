import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState, useContext, useEffect } from "react";
import { Profile2User, UserAdd } from "iconsax-reactjs";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import SuggestionCardSkeleton from "../../Components/SuggestionCardSkeleton/SuggestionCardSkeleton";

export default function Suggestions() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { getUserData } = useContext(AuthUserContext);

  // get suggestions aoi call
  const { data } = useQuery({
    queryKey: ["suggestionsPage", page],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_BASE_URL}users/suggestions`, {
        params: { page, limit },
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
    keepPreviousData: true,
  });

  const suggestions = data?.data?.data?.suggestions ?? [];
  const pagination = data?.data?.meta?.pagination;

  useEffect(() => {
    if (!data) return;
    setAllUsers((prev) =>
      page === 1 ? suggestions : [...prev, ...suggestions]
    );
    if (pagination?.nextPage) {
      setPage(pagination.nextPage);
    }
  }, [data]);

  // filter users in search
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const visibleUsers = filteredUsers.slice(0, visibleCount);

  // follow mutation call api
  const followMutation = useMutation({
    mutationFn: (userId) =>
      axios.put(
        `${import.meta.env.VITE_BASE_URL}users/${userId}/follow`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      ),
  });

  // handle follow function for mutation implementation
  function handleFollow(userId) {
    toast.promise(followMutation.mutateAsync(userId), {
      loading: "Processing...",
      success: (res) => {
        getUserData();
        return res.data.message;
      },
      error: "Failed",
    });
  }

  // handle load more function
  function handleLoadMore() {
    setVisibleCount((prev) => prev + 20);
  }

  return (
    <div className="max-w-4xl mx-auto md:mt-10 space-y-6 p-4 md:p-0 mb-10">
      <button
        onClick={() => navigate("/posts")}
        className="flex items-center gap-2 cursor-pointer bg-white shadow px-4 py-3 rounded-lg hover:bg-gray-100 transition"
      >
        ← Back to Home
      </button>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            <Profile2User className="inline me-1 text-emerald-600" />
            All Suggested Friends
          </h2>
          <div>
          <span className="bg-emerald-100 md:me-2 text-emerald-700 px-3 py-3 rounded-xl hidden md:inline">
            {visibleUsers.length}
          </span>
            {visibleCount < filteredUsers.length && (
          <button
            onClick={handleLoadMore}
            className=" md:w-40 w-25 cursor-pointer bg-emerald-800 text-white py-2.5 rounded-xl hover:bg-emerald-700 transition"
          >
            Load more <span className="md:inline hidden">users</span>
          </button>
          )}
          </div>
        </div>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(20);
          }}
          className="w-full border border-gray-200 bg-gray-100/30 rounded-xl px-3 py-2 mb-6"
        />
        <div className="grid md:grid-cols-2 gap-4">
          {visibleUsers.length === 0 ? (
            <div className="col-span-2 grid md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <SuggestionCardSkeleton key={i} />
              ))}
            </div>) : (
            visibleUsers.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center p-4 border border-gray-200 bg-gray-100/30 rounded-xl"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  <img
                    src={user.photo}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-400">
                      {user.followersCount ?? 0} followers
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFollow(user._id);
                  }}
                  className="bg-emerald-100 text-emerald-600 px-3 py-1 hover:bg-emerald-200 rounded-lg text-sm"
                >
                  <UserAdd size="16" className="inline me-1.5 mb-1" />
                  Follow
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}