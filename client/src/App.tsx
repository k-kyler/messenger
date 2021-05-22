import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import ChatArea from "./pages/ChatArea/ChatArea";

function App() {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path="/" component={LogIn} />
                    <Route
                        path="/chatarea/:username/:room"
                        component={ChatArea}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
