import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({component: Component, ...props}) {
    return (
        <Route exact path={props.path}>
            { <Component {...props} /> }
        </Route>
    )
}
//<Component {...props} />
//{ props.loggedIn ? props.children: <Redirect to='/signin' /> }
export default ProtectedRoute