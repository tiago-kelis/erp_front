import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router"
import { userAuth } from "src/utils/auth"


type Props = {
    children: ReactNode
}

export const AuthMiddleWare = ({children}: Props) => {

    const navigate = useNavigate();

    const {isLogged} = userAuth();

    useEffect(() => {

        if(!isLogged) navigate("/signin")

    }, [])   

    return (
        <>
         {children}
        </>
    )
}