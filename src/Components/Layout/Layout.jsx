import { Outlet, useLocation, matchRoutes } from "react-router";
import AppNavbar from "../AppNavbar/AppNavbar";
import myBackImage from "../../assets/myimage-back.jpg"

export default function Layout() {
  const location = useLocation();
  const routesWithoutNavbar = [
    { path: "/login" },
    { path: "/register" },
  ];
  const myMatch = matchRoutes(routesWithoutNavbar, location);

  return (
    <main>
      {!myMatch && <AppNavbar />}
      <div className="min-h-screen bg-cover bg-center bg-fixed overflow-auto"
        style={{ backgroundImage: `url(${myBackImage})`}}>
        <div className={`min-h-screen bg-linear-to-br from-emerald-600/40 to-white/30 ${!myMatch ? "pt-4" : ""}`}>
          <Outlet />
        </div>
      </div>
    </main>
  );
}


