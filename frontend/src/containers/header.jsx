import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/header/header';
import { PathConstants } from '../lib/path-constants';
import { logout } from '../store/actions/user';

export default function Header() {
    const userRole = useSelector(state => state.user.role);
    const [loginPath, setLoginPath] = useState(PathConstants.PatientLogin);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.pathname === PathConstants.DoctorLogin || location.pathname === PathConstants.DoctorSignup) {
            setLoginPath(PathConstants.DoctorLogin);
        } else if (location.pathname === PathConstants.CounselorLogin || location.pathname === PathConstants.CounselorSignup) {
            setLoginPath(PathConstants.CounselorLogin);
        } else if (location.pathname === PathConstants.Home ||
            location.pathname === PathConstants.PatientLogin ||
            location.pathname === PathConstants.PatientSignup) {
            setLoginPath(PathConstants.PatientLogin);
        } else {
            setLoginPath(null);
        }
    }, [location, setLoginPath]);

    const onLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("USER");
        dispatch(logout());
        navigate(PathConstants.Home);
    }

    return (
        <HeaderComponent
            userRole={userRole}
            loginPath={loginPath}
            onLogout={onLogout}
        />
    )
}
