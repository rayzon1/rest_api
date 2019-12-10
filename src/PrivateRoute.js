import React from "react";
import { Route, Redirect } from "react-router-dom";

// HOC will wrap private route in context to compare auth user.
// If auth, will render private route, otherwise redirect to sign-in.
export default ({ component: Component, signedInUser, ...rest  }) => {
    console.log(signedInUser);
  return (
    <Route
        {...rest}
        render={ () =>
        signedInUser ? (
            <Component {...rest} />
        ) : (
            <Redirect to={{
                pathname: '/signin', 
            }} />
        )
        }
    />
  );
};