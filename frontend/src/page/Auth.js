import "../styles.css"
import SignInForm from "../component/SignInForm";
import {useContext, useEffect, useState} from "react";
import SignUpForm from "../component/SignUpForm";
import {AuthContext, useAuth} from "../hook/useAuth";
import {useHistory} from "react-router-dom";

const Auth = () => {

    const authCtx = useContext(AuthContext);

    const auth = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push("/main");
        }
    }, []);

    const signInIsDefault = true;
    const getActionDetails = (isActionEqualsSignIn) => {
        return {
            headerText: isActionEqualsSignIn? "Signing into account" : "Registration",
            oppositeAction: isActionEqualsSignIn? "Sign Up" : "Sign In"
        };
    }

    const [isSignIn, setSignIn] = useState(signInIsDefault);
    const [formHeader, setFormHeader] = useState(getActionDetails(signInIsDefault).headerText);
    const [oppositeAction, setOppositeAction] = useState(getActionDetails(signInIsDefault).oppositeAction);

    const updateAuthStatus = () => {
        authCtx.setAuthenticated(true);
        history.push("/main");
    }

    const getCurrentComponent = (changeComponentFunc) => {
        return isSignIn
            ? (<SignInForm event={updateAuthStatus} changeComponent={changeComponentFunc} />)
            : (<SignUpForm changeComponent={changeComponentFunc} />);
    }

    const toggleCurrentAction = () => {
        const newValue = !isSignIn;
        setSignIn(newValue);
        const details = getActionDetails(newValue);
        setFormHeader(details.headerText);
        setOppositeAction(details.oppositeAction);
    }

    return (
        <AuthContext.Consumer>
            {value =>
                <div className={"login-container"}>
                    <div>
                        <p>
                            ONE<br />
                            CLICK<br />
                            LCA<br />
                        </p>
                    </div>
                    <div>
                        <div className={"auth-container"}>
                            <div className={"auth-header"}>{formHeader}</div>
                            {getCurrentComponent(toggleCurrentAction)}
                            <div className={"link"} onClick={toggleCurrentAction} >{oppositeAction}</div>
                        </div>
                    </div>
                </div>
            }
        </AuthContext.Consumer>
    );
}

export default Auth;
