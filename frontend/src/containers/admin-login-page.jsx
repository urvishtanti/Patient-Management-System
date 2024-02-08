import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AdminLoginComponent } from '../components/admin-login/admin-login';
import { PathConstants } from '../lib/path-constants';
import { RequestState, UserRole } from '../lib/types';
import { login } from '../store/actions/user';

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const loginState = useSelector(state => state.user.loginState);

    const navigate = useNavigate();

    const onClick = () => {
        dispatch(login(email, password, UserRole.ADMIN));
    }

    useEffect(() => {
        if (loginState === RequestState.COMPLETED) {
            // redirect to ManagerDataAnalytics page.
            navigate(PathConstants.ManagerDataAnalytics);
        }
    }, [navigate, loginState]);

    return <AdminLoginComponent
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onClick={onClick}
    />
}