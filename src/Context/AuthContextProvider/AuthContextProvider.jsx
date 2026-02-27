import axios from "axios";
import { createContext, useState } from "react";

export const AuthUserContext = createContext();
export default function AuthContextProvider({children}) {
    const [userData, setUserData] = useState(function() {
        return getUserData();
    })
    
    // get user data api call
    async function getUserData() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}users/profile-data`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        setUserData(response.data.data.user)
        return response.data.data.user
        } catch (error) {
            setUserData(null)
            return null
        }
    }
    
    const myProvider = {userData, setUserData, getUserData}
    return <AuthUserContext.Provider value={myProvider}>
        {children}
    </AuthUserContext.Provider>;
}
