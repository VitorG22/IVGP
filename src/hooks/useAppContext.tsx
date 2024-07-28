import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function UseAppContext(){
    const contextData = useContext(AppContext)
    return(contextData)
}