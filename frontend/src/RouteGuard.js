import jwtDecode from 'jwt-decode';
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PathConstants } from './lib/path-constants';

const RouteGuard = ({ component: Component, ...rest }) => {
    function hasJWT() {
        let flag = false;

        //check user has JWT token
        const accessToken = localStorage.getItem("token");

        if (accessToken) {
            const user = jwtDecode(accessToken); // decode your token here
        }
        return flag
    }

    return (
        <Route {...rest}
            element={props => (
                hasJWT() ?
                    <Component {...props} />
                    :
                    <Navigate to={PathConstants.Home} />
            )}
        />
    );
};

export default RouteGuard;