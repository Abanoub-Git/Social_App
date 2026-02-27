import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useContext, useMemo } from "react";
import { Profile2User, UserAdd } from "iconsax-reactjs";
import toast from "react-hot-toast";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";

export default function SuggestFollowers({ limit = 5, showViewMore = true }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { getUserData } = useContext(AuthUserContext);

  // get suggestions api call
  const { data } = useQuery({
    queryKey: ["suggestionsSidebar"],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_BASE_URL}users/suggestions`, {
        params: { page: 1, limit: 20 }, // نجيب 20 ونختار منهم 5 عشوائي
        headers: { token: localStorage.getItem("token") },
      }),
  });

  const suggestions = data?.data?.data?.suggestions ?? [];
  const randomUsers = useMemo(() => {
    const shuffled = [...suggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }, [suggestions, limit]);

  // follow mutation
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
        queryClient.invalidateQueries({ queryKey: ["suggestionsSidebar"] });
        getUserData();
        return res.data.message;
      },
      error: "Failed",
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-md">
          <Profile2User size={22} className="text-emerald-700 inline" /> Suggested Friends
        </h3>
        <span className="bg-emerald-100 text-emerald-600 text-md px-3 py-1 rounded-full">
          {randomUsers.length}
        </span>
      </div>

      <div className="space-y-3">
        {randomUsers.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-3 border border-gray-200 bg-gray-100/30 rounded-xl"
          >
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              <img
                src={user.photo}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-sm hover:underline">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400">
                  {user.followersCount ?? 0} followers
                </p>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFollow(user._id);
              }}
              className="bg-emerald-100 text-emerald-600 cursor-pointer hover:bg-emerald-200 px-2 py-1 rounded-lg text-sm flex items-center gap-1"
            >
              <UserAdd size="16" />
              Follow
            </button>
          </div>
        ))}
      </div>

      {showViewMore && (
        <button
          onClick={() => navigate("/suggestions")}
          className="w-full mt-4 bg-emerald-800 hover:bg-emerald-900 cursor-pointer text-white rounded-xl py-2 text-sm"
        >
          View more
        </button>
      )}
    </div>
  );
}