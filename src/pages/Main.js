import React from "react"
import App from "./App"
import { BrowserRouter, Route, Switch } from "react-router-dom"

function Menu() {
    return (
        <div>
            <h1 style={{ color: "white" }}>{window.location.pathname}</h1>
            <a href="/dashboard"><button>Dashboard</button></a>
        </div>
    )
}

export default function Main() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/dashboard" component={App} exact />
                    <Route path="/" component={Menu} />

                </Switch>
            </BrowserRouter>
        </div>
    )
}