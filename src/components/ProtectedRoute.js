import React from "react";
//import Footer from './Footer';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
 
  if (props.loggedIn) {
    return <Route>
      <Component {...props}/>
    </Route>
  }

  return <Route><Redirect to ="/sign-in" /></Route>

};

export default ProtectedRoute;
