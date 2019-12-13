import React from "react";
import { Route, Redirect } from "react-router-dom";

// HOC will wrap private route in context to compare auth user.
// If auth, will render private route, otherwise redirect to sign-in.
export default ({ component: Component, signedInUser, courseDetails, signOut, ...rest }) => {

  return (
    <Route
      {...rest}
      render={() =>
        signedInUser ? (
          <Component courseDetails={courseDetails} signedInUser={signedInUser} signOut={signOut} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin"
            }}
          />
        )
      }
    />
  );
};
