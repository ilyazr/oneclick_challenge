import {Redirect, Route} from "react-router-dom";
import {useAuthContext} from "../hook/useAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuthContext();
    return (
        <Route
            {...rest}
            render={props => (
                isAuthenticated
                    ?
                    <Component {...props} />
                    :
                    <Redirect to={"/signin"} />
            )}
        />
    );
};

export default PrivateRoute;
