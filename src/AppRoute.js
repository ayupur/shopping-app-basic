import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import App from './App';
import Checkout from './Checkout';

export default function AppRoute() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <App />
                </Route>
                <Route path="/checkout">
                    <Checkout />
                </Route>
            </Switch>
        </Router>
    );
}