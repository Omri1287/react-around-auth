import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({component: Component, ...props}) {
    return (
		<Route>
			{() =>
				props.loggedIn? (
					<>
						<Component {...props} />
					</>
				) : (
					<Redirect to="/signin" />
				)
			}
		</Route>
    )
}
//<Component {...props} />
//{ props.loggedIn ? props.children: <Redirect to='/signin' /> }
export default ProtectedRoute