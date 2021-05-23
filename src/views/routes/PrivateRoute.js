import React from 'react'
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../contexts/authContext";


export function PrivateRoute({ component: Component, ...rest }) {

    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        >
        </Route>
    )
}

export function PrivateRedirect({ component: Component, ...rest }) {

    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Redirect from="/" to="/admin/dashboard" /> : <Redirect to="/login" />
            }}
        >
        </Route>
    )
}


