//============================== has no function at this time ==============================

import { Home2 } from "iconsax-reactjs";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <title>Error 88</title>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-cyan-500 via-teal-500 to-emerald-500 relative overflow-hidden">
        <div className="absolute size-125 bg-white/10 rounded-full blur-3xl -top-24 -left-24"></div>
        <div className="absolute size-100 bg-black/10 rounded-full blur-3xl -bottom-24 -right-24"></div>
        <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-12 text-center shadow-2xl max-w-lg w-full mx-6">
          <h1 className="text-[120px] font-extrabold text-white leading-none drop-shadow-lg">
            404
          </h1>
          <h2 className="text-3xl font-bold text-white mt-4">
            Page Not Found
          </h2>
          <p className="text-white/90 mt-4 text-lg">
            The page you're looking for doesn’t exist or has been moved.
          </p>
          <button
            onClick={() => navigate("/posts")}
            className="mt-8 inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition duration-200"
          >
            <Home2 size="20" />
            Back To Feed
          </button>
        </div>
        <div className="absolute bottom-10 opacity-10 text-[200px] font-extrabold text-white select-none">
          88
        </div>
      </div>
    </>
  );
}
