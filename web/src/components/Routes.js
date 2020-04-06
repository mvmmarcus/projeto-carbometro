import React from 'react';

import Login from '../pages/login';
import Register from '../pages/register';
import Profile from '../pages/profile';
import NewFood from '../pages/newFood';
import NotFound from './NotFound';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoggedHome from '../pages/loggedHome';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from '../pages/forgotPassword/ForgotPassword';
import ResetPassword from '../pages/resetPassword/ResetPassword';;

const Routes = ({ logado, setLogado }) => (
    <BrowserRouter >
            <Switch>
                <Route component={() => <Login setLogado={setLogado} logado={logado} />} exact path="/" />
                <Route component={Register} exact path="/register"/>
                <PrivateRoute component={Profile} exact path="/profile"/>
                <PrivateRoute component={NewFood} exact path="/foods/new"/>
                <Route component={ForgotPassword} exact path="/forgot_password" />
                <Route component={ResetPassword} exact path="/reset_password" />
                <PrivateRoute component={LoggedHome} exact path="/home" />
                <Route component={NotFound} />
            </Switch>
    </BrowserRouter>
)

export default Routes;


/*
import React from 'react'

import Login from '../pages/login'
import Register from '../pages/register'
import Home from '../pages/home'
import NotFound from './NotFound'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import LoggedHome from '../pages/loggedHome'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from '../pages/forgotPassword/ForgotPassword'
import ResetPassword from '../pages/resetPassword/ResetPassword'
import Header from '../containers/Header'


const Routes = ({ logado, setLogado }) => (
    <BrowserRouter >
        <Header setLogado={setLogado} logado={logado}>
            <Switch>
                <Route component={Home} exact path="/" />
                <Route component={<Login setLogado={setLogado} logado={logado} />} exact path="/login" />
                <Route component={Register} exact path="/register" />
                <Route component={ForgotPassword} exact path="/forgot_password" />
                <Route component={ResetPassword} exact path="/reset_password" />
                <PrivateRoute component={LoggedHome} exact path="/home" />
                <Route component={NotFound} />
            </Switch>
        </Header>
    </BrowserRouter>
)

export default Routes;
*/