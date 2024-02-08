import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DoctorSignupComponent } from "../components/doctor-signup/doctor-signup";
import FooterComponent from "../components/footer/footer";
import { PathConstants } from "../lib/path-constants";
import { toUTCDate } from "../lib/time-util";
import { RequestState, UserRole } from "../lib/types";
import { signup } from "../store/actions/user";
import { RESET_USER_SIGNUP } from "../store/types";
import Header from "./header";

export default function DoctorSignup(props) {
    const [user, setUser] = useState({
        fullName: "",
        emailAddress: "",
        addressLine: "",
        city: "",
        province: "",
        country: "",
        dateOfBirth: "",
        phoneNumber: "",
        password: "",
        rePassword: "",
        registrationNumber: ""
    });

    const onFieldChange = (fieldName, value) => {
        setUser({
            ...user,
            [fieldName]: value
        });
    }

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({ type: RESET_USER_SIGNUP });
    }, [dispatch]);

    const onSubmit = (e) => {
        dispatch(signup({
            ...user,
            dateOfBirth: toUTCDate(user.dateOfBirth)
        }, UserRole.DOCTOR));
    }

    const signupState = useSelector(state => state.user.signupState);

    const navigate = useNavigate();

    useEffect(() => {
        if (signupState === RequestState.COMPLETED) {
            // redirect to DoctorLogin page.
            navigate(PathConstants.DoctorLogin);
        }
    }, [navigate, signupState]);

    return (
        <>
            <Header />
            <DoctorSignupComponent
                user={user}
                onFieldChange={onFieldChange}
                onSubmit={onSubmit}
            />
            <FooterComponent />
        </>
    )
}