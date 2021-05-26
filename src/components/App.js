import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import GlobalStyle from '../styles/GlobalStyles';
import Login from './Login_SignUp/Login';
import SignUp from './Login_SignUp/SignUp';
import UserInput from "./Timeline/Post/UserInput";
import Timeline from './Timeline/Timeline';


export default function App() {
    return(
        <Router>
            <Switch>
                <Route exact path= "/">
                    <Login />
                </Route>
                <Route path= "/sign-up">
                    <SignUp />
                </Route>
                <Route path= "/timeline">
                    <Timeline />
                </Route>
                <Route exact path= "/teste">
                    <UserInput />
                </Route>
            </Switch>
        </Router>
    );
}