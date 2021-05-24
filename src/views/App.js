import React from 'react';
import { AuthProvider } from '../contexts/authContext.js';
import Login from "./login/login.js";
//import Home from "./dashboard/home";
import ForgotPassword from "./login/forgotPassword.js";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import {PrivateRoute, PrivateRedirect} from "./routes/PrivateRoute.js"

import Admin from "../layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.10.0";
import UpdateProfile from './login/UpdateProfile.js';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/forgotpass" component={ForgotPassword} />
          <PrivateRedirect path='/'/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
