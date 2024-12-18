import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../utils/auth';

const PrivateRoute = ({ children }) => {
    const authToken = getAccessToken();
    return authToken ? children : <Navigate to="/signin-signup" />;
};

export default PrivateRoute;
