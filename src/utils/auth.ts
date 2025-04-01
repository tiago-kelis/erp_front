import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useRequest } from "./request";
import { setUser, setUserEnterprise } from "./redux/reducers/authReducer";


const LOCAL_STORAGE_KEY = "AUTH_ACCESS";

export const handleGetAccessToken = () => localStorage.getItem(LOCAL_STORAGE_KEY) ?? "";

export const userAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();

    const {signIn, getUser} = useRequest();  

    const user = {
        user: auth.user,
        enterprise: auth.enterprise,
    }



    const handleInitUser = async () => {        
        const access_token = handleGetAccessToken();
        if (!access_token) return;

        const response = await getUser();

        if(response) {
            dispatch(setUser(response.data.user));
            dispatch(setUserEnterprise(response.data.enterprise));
        }     
          
    }

    
    const handlePermissionExists = (perimissionCodename: string) => {
        if(auth.enterprise.is_owner) return true;
        
        return auth.enterprise.permissions.some(p => p.codename === perimissionCodename);
    }


    const handleSignIn = async ({email, password}: {  email: string, password: string }) => {        
        const response = await signIn({email, password});        
        if(!response.detail) {
            dispatch(setUser(response.data.user));
            dispatch(setUserEnterprise(response.data.enterprise));

            // Save access token local storage
            localStorage.setItem(LOCAL_STORAGE_KEY, response.data.access);            
        }        
    }

    const hamdleSignOut = () => {
        dispatch(setUser(null));
        dispatch(setUserEnterprise(null));
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    return {
        user,
        islogged: auth.user !== null,
        handleInitUser,
        handlePermissionExists,
        handleSignIn,
        hamdleSignOut,
       
    };
   
}