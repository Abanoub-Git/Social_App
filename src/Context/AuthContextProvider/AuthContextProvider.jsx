import axios from "axios";
import { createContext, useEffect, useState } from "react";
import "../../Shared/axiosInterceptors/axiosInterceptors";

export const AuthUserContext = createContext();
export default function AuthContextProvider({children}) {
    const [userData, setUserData] = useState(function() {
        return getUserData();
    })

    useEffect(() => {
        function handleUnauthorized() {
            localStorage.removeItem("token");
            setUserData(null);
        }
        window.addEventListener("auth:unauthorized", handleUnauthorized);
        return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
    }, []);
    
    // get user data api call
    async function getUserData() {
        const token = localStorage.getItem('token');
        if (!token) {
            setUserData(null);
            return null;
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}users/profile-data`, {
                headers: {
                    token
                }
            })
            setUserData(response.data.data.user)
            return response.data.data.user
        } catch (error) {
            localStorage.removeItem('token')
            setUserData(null)
            return null
        }
    }
    
    const myProvider = {userData, setUserData, getUserData}
    return <AuthUserContext.Provider value={myProvider}>
        {children}
    </AuthUserContext.Provider>;
}

