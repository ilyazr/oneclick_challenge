import {createContext, useContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useHistory} from "react-router-dom";
import {loginRequest} from "../api/loginRequest";
import {signupRequest} from "../api/signupRequest";

const ACCESS_TOKEN_NAME = process.env.REACT_APP_ACCESS_TOKEN_NAME;
const REFRESH_TOKEN_NAME = process.env.REACT_APP_REFRESH_TOKEN_NAME;

export const AuthContext = createContext();

export const useAuth = () => {

    const history = useHistory();

    const accessTokenExist = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);

    const [isAuthenticated, setAuthenticated] = useState(!!accessTokenExist);
    const [userData, setUserData] = useState({});

    const parseJwt = (jwt) => {
        const decodedToken = jwt_decode(jwt);
        return decodedToken;
    }

    const setUserDataFromJwt = (jwt) => {
        setUserData(parseJwt(jwt));
    }

    const initData = () => {
        const hasToken = !!localStorage.getItem(ACCESS_TOKEN_NAME);
        if (!isAuthenticated && hasToken) {
            setUserDataFromJwt(localStorage.getItem(ACCESS_TOKEN_NAME));
            setAuthenticated(true);
        }
        if (userData && !userData.sub && hasToken) {
            setUserDataFromJwt(localStorage.getItem(ACCESS_TOKEN_NAME));
        }
    };

    useEffect(() => {
        initData()
    });

    const signUp = async (userData) => {
        const response = await signupRequest(userData);
        return response;
    }

    const login = async (userData) => {
        const response = await loginRequest(userData)
        if (response.ok) {
            let accessToken = response.headers.get('access-token');
            if (!accessToken) throw new Error("JWT is missing");
            // store tokens
            setUserDataFromJwt(accessToken);
            localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
            setAuthenticated(true);
            return response;
        } else {
            const loginErrMsg = "authentication error! response status:  " + response.status;
            console.log(loginErrMsg);
            throw new Error(loginErrMsg);
        }
    };

    const logout = async () => {
        setAuthenticated(false);
        const delTokensFromLocalStorage = (...keys) => {
            keys.forEach(key => localStorage.removeItem(key));
        }
        delTokensFromLocalStorage(ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME);
        setUserData(null);
    };

    return {
        isAuthenticated,
        setAuthenticated,
        userData,
        signUp,
        login,
        logout,
        initData,
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
    const { initData } = useAuth();
    useEffect(() => initData());
    return useContext(AuthContext);
}
