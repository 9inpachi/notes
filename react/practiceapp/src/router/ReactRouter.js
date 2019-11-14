import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

export default function ReactRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        <li>
                            <Link to='/contact'>Contact</Link>
                        </li>
                        <li>
                            <Link to='/sub-routes'>With Sub Routes</Link>
                        </li>
                    </ul>
                </nav>
                {/* Its important that the '/' route comes at the end because if its first, it will always be true and will get routed first because react checks which routes are satisfied and uses the one which comes first */}
                <Switch>
                    <Route path='/about'>
                        <About />
                    </Route>
                    <Route path='/contact'>
                        <Contact />
                    </Route>
                    <Route path='/sub-routes'>
                        <h2>Sub routes exist here</h2>
                        <SubRoutes />
                    </Route>
                    <Route path='/' exact> {/* exact will make sure to look for the exact route without any wildcards */}
                        <Home />
                    </Route>
                    <Route path='/'>
                        <p>Error here</p>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home here</h2>;
}

function About() {
    return <h2>About here</h2>;
}

function Contact() {
    return <h2>Contact here</h2>;
}

function SubRoutes() {
    var match = useRouteMatch(); // Used to get the currect route (can get url or path)
    console.log(match);
    return (
        <div>
            <ul>
                <li>
                    <Link to={`${match.url}/sub-route-1`}>Sub Route 1</Link>
                </li>
                <li>
                    <Link to={`${match.url}/sub-route-2`}>Sub Route 2</Link>
                </li>
            </ul>
            <Switch>
                <Route path={`${match.url}/sub-route-1`}>
                    <p>Sub route 1 data</p>
                </Route>
                <Route path={`${match.url}/sub-route-2`}>
                    <p>Sub route 2 data</p>
                </Route>
            </Switch>
        </div>
    );
}