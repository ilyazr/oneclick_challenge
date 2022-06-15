import {useHistory} from "react-router-dom";
import {useAuthContext} from "../hook/useAuth";

const Header = () => {
    let { logout, userData, isAuthenticated } = useAuthContext();
    let history = useHistory();
    const {firstName, lastName} = userData;

    const logoutEvent = () => {
        logout();
        history.push("/signin");
    };
    return (
        <>
            { isAuthenticated &&
                <div className="header">
                    <div className="links-block">
                        <div className="name h-block"
                             onClick={() => history.push("/main")}>Calculation Page</div>
                        <div className="vl"></div>
                        <div className="logout-btn h-block"
                             onClick={() => history.push("/archive")}>Archive</div>
                    </div>
                    <div className="name h-block">{`${firstName} ${lastName}`}</div>
                    <div className="vl"></div>
                    <div className="logout-btn h-block" onClick={logoutEvent}>Log out</div>
                </div>
            }
        </>
    );
}

export default Header;
