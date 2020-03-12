import React from 'react'

import { Switch, Route } from 'react-router'

import Login from '../pages/login'
import Register from '../pages/register'
import Home from '../pages/home'
import NotFound from './NotFound'
import { BrowserRouter } from 'react-router-dom'
import LoggedHome from '../pages/loggedHome'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from '../pages/forgotPassword/ForgotPassword'
import ResetPassword from '../pages/resetPassword/ResetPassword'
import Header from '../containers/Header'


const Routes = ({ token, setToken }) => (
    <BrowserRouter >
        <Header setToken={setToken} token={token}>
            <Switch>
                <Route component={Home} exact path="/" />
                <Route component={() => <Login setToken={setToken} token={token} />} exact path="/login" />
                <Route component={Register} exact path="/register" />
                <Route component={ForgotPassword} exact path="/forgot_password" />
                <Route component={ResetPassword} exact path="/reset_password" />
                <PrivateRoute component={LoggedHome} exact path="/home" />
                <Route component={NotFound} />
            </Switch>
        </Header>
    </BrowserRouter>
)

export default Routes
