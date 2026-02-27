//============================== has no function at this time ==============================

import { createContext, useState } from "react"
export const createdContext =  createContext();  //createdContext da obj fe provider w 7gat tanya
export default function CounterContext({children}) {
    const [counter, setCounter] = useState(0)
    return (
    <createdContext.Provider value={{counter,  setCounter}}>{children}</createdContext.Provider>//kda context provider howa ali bywrap kol alchildrens aw alapp 
    )
}
