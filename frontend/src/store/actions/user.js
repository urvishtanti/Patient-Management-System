import { PLEASE_TRY_AGAIN, SOMETHING_WENT_WRONG } from "../../lib/messages";
import request from "../../lib/request";
import { UserRole } from "../../lib/types";
import { USER_LOGIN_ERROR, USER_LOGIN_FETCHING, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_ERROR, USER_PROFILE_FETCHING, USER_PROFILE_SUCCESS, USER_PROFILE_UPDATE_ERROR, USER_PROFILE_UPDATE_FETCHING, USER_PROFILE_UPDATE_SUCCESS, USER_SIGNUP_ERROR, USER_SIGNUP_FETCHING, USER_SIGNUP_SUCCESS } from "../types";
import { openErrorMessageModal, openSuccessMessageModal } from "./gui";

const LOGIN_APIS = {
    [UserRole.PATIENT]: `patient/login`,
    [UserRole.COUNSELOR]: `counselor/login`,
    [UserRole.DOCTOR]: `doctor/login`,
    [UserRole.ADMIN]: `admin/login`,
}

const SIGNUP_APIS = {
    [UserRole.PATIENT]: `patient/signup`,
    [UserRole.COUNSELOR]: `counselor/signup`,
    [UserRole.DOCTOR]: `doctor/signup`
}

const PROFILE_APIS = {
    [UserRole.PATIENT]: `patient/profile`,
    [UserRole.COUNSELOR]: `counselor/profile`,
    [UserRole.DOCTOR]: `doctor/profile`
}

export const login = (emailId, password, role) => async (dispatch) => {
    if (!emailId || !password || !role || !LOGIN_APIS[role]) {
        return;
    }
    dispatch({ type: USER_LOGIN_FETCHING });
    request(LOGIN_APIS[role], "POST", null, { emailId, password })
        .then((resp) => {
            if (resp.data && resp.data.loginSuccess) {
                // save token to localStorage
                localStorage.setItem("USER", resp.data.accessToken);

                const status = role === UserRole.PATIENT ? resp.data.status : null;
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    user: resp.data.user,
                    role: role,
                    status
                });
            } else {
                dispatch(openErrorMessageModal(resp.data.errorMessage));
                dispatch({
                    type: USER_LOGIN_ERROR,
                    errorMessage: resp.data.errorMessage
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: USER_LOGIN_ERROR,
                errorMessage: PLEASE_TRY_AGAIN
            });
        });
}

export const signup = (user, role) => async (dispatch) => {
    if (!role || !SIGNUP_APIS[role]) {
        return;
    }
    dispatch({ type: USER_SIGNUP_FETCHING });
    request(SIGNUP_APIS[role], "POST", null, { ...user })
        .then((resp) => {
            if (resp.data && resp.data.loginSuccess) {
                // save token to localStorage
                dispatch(openSuccessMessageModal("Your signup was successful! Please, login!"));
                dispatch({
                    type: USER_SIGNUP_SUCCESS
                });
            } else if (resp.data) {
                dispatch(openErrorMessageModal(resp.data.errorMessage));
                dispatch({
                    type: USER_SIGNUP_ERROR,
                    errorMessage: resp.data.errorMessage
                });
            } else {
                localStorage.removeItem("USER");
            }
        })
        .catch((exception) => {
            localStorage.removeItem("USER");
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: USER_SIGNUP_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}

export const logout = () => (dispatch) => {
    dispatch({
        type: USER_LOGOUT
    })
}

export const setUser = (user, role) => (dispatch) => {
    dispatch({
        type: USER_LOGIN_SUCCESS,
        user: user,
        role: role
    })
}

export const fetchProfile = (role) => async (dispatch) => {
    if (!role || !PROFILE_APIS[role]) {
        return;
    }
    dispatch({ type: USER_PROFILE_FETCHING });
    request(PROFILE_APIS[role], "GET", null, null)
        .then((resp) => {
            if (resp && resp.data) {
                dispatch({
                    type: USER_PROFILE_SUCCESS,
                    payload: resp.data
                });
            } else {
                dispatch(openErrorMessageModal(SOMETHING_WENT_WRONG));
                dispatch({
                    type: USER_PROFILE_ERROR,
                    errorMessage: SOMETHING_WENT_WRONG
                });
            }
        })
        .catch((exception) => {
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            // handle error.
            dispatch({
                type: USER_PROFILE_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}


export const updateProfile = (user, role) => async (dispatch) => {
    if (!role || !PROFILE_APIS[role]) {
        return;
    }
    dispatch({ type: USER_PROFILE_UPDATE_FETCHING });
    request(PROFILE_APIS[role], "PATCH", null, user)
        .then((resp) => {
            if (resp && resp.data) {
                dispatch({
                    type: USER_PROFILE_UPDATE_SUCCESS,
                    payload: resp.data
                });
                dispatch(openSuccessMessageModal("Your profile was updated!"));
            } else {
                dispatch(openErrorMessageModal(SOMETHING_WENT_WRONG));
                dispatch({
                    type: USER_PROFILE_UPDATE_ERROR,
                    errorMessage: SOMETHING_WENT_WRONG
                });
            }
        })
        .catch((exception) => {
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            // handle error.
            dispatch({
                type: USER_PROFILE_UPDATE_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}