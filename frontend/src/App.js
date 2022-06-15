import './styles.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Auth from "./page/Auth";
import Main from "./page/Main";
import {AuthProvider} from "./hook/useAuth";
import Archive from "./page/Archive";
import PrivateRoute from "./component/PrivateRoute";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/signin" />
                        </Route>
                        <Route path="/signin" component={Auth} />
                        <PrivateRoute component={Main} path="/main" />
                        <PrivateRoute component={Archive} path="/archive" />
                    </Switch>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
