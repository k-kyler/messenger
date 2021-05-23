import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import ChatArea from "./pages/ChatArea/ChatArea";

function App() {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path="/" component={LogIn} />
                    <Route
                        exact
                        path="/chat/:username/:room"
                        component={ChatArea}
                    />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
