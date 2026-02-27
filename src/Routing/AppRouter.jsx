import { createBrowserRouter, Navigate } from "react-router";
import Layout from "../Components/Layout/Layout";
import Posts from "../Pages/Posts/Posts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "./AuthProtectedRoute/AuthProtectedRoute";
import PostDetails from "../Pages/PostDetails/PostDetails";
import Settings from "../Pages/Settings/Settings";
import Profile from "../Pages/Profile/Profile";
import Suggestions from "../Pages/Suggestions/Suggestions";
import Notification from "../Pages/Notification/Notification";
import UserProfile from "../Pages/UserProfile/UserProfile";

export const myRouter =  createBrowserRouter([
    {path: '/', element: <Layout/>, children: [
        {index: true, element:<ProtectedRoute> <Posts/></ProtectedRoute>},
        {path: 'posts', element: <ProtectedRoute><Posts/></ProtectedRoute>},
        {path: 'postDetails/:id', element: <ProtectedRoute><PostDetails/></ProtectedRoute>},
        {path: "settings", element: <ProtectedRoute><Settings /></ProtectedRoute> },
        {path: "profile", element: <ProtectedRoute><Profile/></ProtectedRoute> },
        {path: "suggestions", element: <ProtectedRoute><Suggestions /></ProtectedRoute>},
        {path: "userProfile/:id", element: <ProtectedRoute><UserProfile/></ProtectedRoute>},
        {path: "profile/:id", element: <ProtectedRoute><UserProfile /></ProtectedRoute>},
        {path: "notification", element: <ProtectedRoute><Notification /></ProtectedRoute>},
        {path: 'login', element: <AuthProtectedRoute><Login/></AuthProtectedRoute>},
        {path: 'register', element: <AuthProtectedRoute><Register/></AuthProtectedRoute>},
        {path: '*', element: <Navigate to="/posts" replace /> },
    ]}
])


//absolute path /login (make url empty then put login will appear outside layout)
//relative login (put login inside layout login will appear inside layout) 