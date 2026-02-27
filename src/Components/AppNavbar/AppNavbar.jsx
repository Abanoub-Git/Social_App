import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Home, Notification, Profile } from "iconsax-reactjs";
import { useContext, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import myImage from "../../../public/88.png"
import { useQuery } from "@tanstack/react-query";


export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {userData,getUserData,setUserData } = useContext(AuthUserContext);
  const profileImage = useRef()
  const router = useNavigate()



  //Logout function
  function handleLogout() {
    localStorage.clear();
    setUserData(null)
    router('/login')
  }



  //Unread notification count
  const { data: unreadCount = 0 } = useQuery({
  queryKey: ["unreadCount"],
  queryFn: async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}notifications/unread-count`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    return res.data.data.unreadCount;
  },
  enabled: !!userData,
});





  //Update profile image API
  async function handleUserProfile() {
    const myForm = new FormData()
    myForm.append('photo', profileImage.current.files[0])
    toast.promise(
      axios.put(`${import.meta.env.VITE_BASE_URL}users/upload-photo`, myForm, {
        headers: {
          token: localStorage.getItem('token')
        }
      }), {
        loading: "Update Profile Image....",
        success: function({data:{message}}) {
          getUserData()
          return message
        },
        error: function(error) {
          return error.response.data.error
        }
      }
    )
  }


  //Navbar UI
  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} classNames={{
    base: "w-full bg-gray-100 shadow-2xl py-1",
    wrapper: "w-[90%] max-w-full px-4",
    }} onMenuOpenChange={setIsMenuOpen}>
        <NavbarBrand>
          <img src={myImage} alt="88Logo" className="w-12" />
          <span className="hidden md:block font-semibold text-2xl ms-1.5"> Community</span>
        </NavbarBrand>
        <NavbarContent justify="center" className="flex-1">
        {userData && (
          <div className="flex items-center gap-1 bg-gray-100 border  border-gray-200 rounded-2xl md:px-3 md:py-2 px-2 py-1 shadow-sm">
            <NavLink
              to="posts"
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm transition ${
                  isActive ? "bg-emerald-100 text-emerald-600 font-semibold" : "text-gray-600"}`}>
              <Home size="20" />
              <span className="hidden md:block">Posts</span>
            </NavLink>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm transition ${
                  isActive ? "bg-emerald-100 text-emerald-600 font-semibold" : "text-gray-600"}`}>
              <Profile size="20" />
              <span className="hidden md:block">Profile</span>
            </NavLink>
            <NavLink
                to="notification"
                className={({ isActive }) =>
                  `relative flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm transition ${
                    isActive ? "bg-emerald-100 text-emerald-600 font-semibold" : "text-gray-600"
                  }`
                }
              >
                <div className="relative">
                  <Notification size="20" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:block">Notification</span>
              </NavLink>
          </div>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        {userData ?  <NavbarItem>
            <Dropdown placement="bottom"> 
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform cursor-pointer bg-white size-11 md:size-12"
              color="success"
              name="Jason Hughes"
              size="sm md:md"
              src={userData.photo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userData.email}</p>
            </DropdownItem>
            <DropdownItem key="settings" className=" capitalize">Name: {userData.name}</DropdownItem>
            <DropdownItem key="team_settings" onClick={() => router("/settings")}>Change Password</DropdownItem>
            <DropdownItem key="analytics" onClick={function() {profileImage.current.click()}}>Update Profile Image</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>Log Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </NavbarItem> : <NavbarItem>
          <Button as={Link} color="primary" to="register" variant="shadow">
            Sign Up
          </Button>
        </NavbarItem>}
      </NavbarContent>
      <input type="file" ref={profileImage} onChange={handleUserProfile}  className="hidden" />
    </Navbar>
)}
