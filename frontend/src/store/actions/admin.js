import request from "../../lib/request";
import { UserRole } from "../../lib/types";
import {
    ADMIN_CREATE_USER_ERROR,
    ADMIN_CREATE_USER_FETCHING,
    ADMIN_CREATE_USER_SUCCESS,
    ADMIN_GET_COUNSELOR_ERROR,
    ADMIN_GET_COUNSELOR_FETCHING,
    ADMIN_GET_COUNSELOR_SUCCESS,
    ADMIN_GET_DOCTOR_ERROR,
    ADMIN_GET_DOCTOR_FETCHING,
    ADMIN_GET_DOCTOR_SUCCESS,
    ADMIN_GET_PATIENT_ERROR,
    ADMIN_GET_PATIENT_FETCHING,
    ADMIN_GET_PATIENT_SUCCESS,
    ADMIN_REMOVE_COUNSELOR_ERROR,
    ADMIN_REMOVE_COUNSELOR_FETCHING,
    ADMIN_REMOVE_COUNSELOR_SUCCESS,
    ADMIN_REMOVE_DOCTOR_ERROR,
    ADMIN_REMOVE_DOCTOR_FETCHING,
    ADMIN_REMOVE_DOCTOR_SUCCESS,
    ADMIN_REMOVE_PATIENT_ERROR,
    ADMIN_REMOVE_PATIENT_FETCHING,
    ADMIN_REMOVE_PATIENT_SUCCESS,
    ADMIN_REPORT_ERROR,
    ADMIN_REPORT_FETCHING,
    ADMIN_REPORT_PARAMETERS_ERROR,
    ADMIN_REPORT_PARAMETERS_FETCHING,
    ADMIN_REPORT_PARAMETERS_SUCCESS,
    ADMIN_REPORT_SUCCESS
} from "../types";
import { openErrorMessageModal } from "./gui";

export const fetchPatients = (page) => async (dispatch) => {
    dispatch({ type: ADMIN_GET_PATIENT_FETCHING });
    request(`admin/patient`, "GET", { page }, null)
        .then((resp) => {
            if (resp.data && resp.data.content) {
                dispatch({
                    type: ADMIN_GET_PATIENT_SUCCESS,
                    payload: resp.data,
                });
            } else {
                dispatch(openErrorMessageModal(resp.data.errorMessage));
                dispatch({
                    type: ADMIN_GET_PATIENT_ERROR,
                    errorMessage: resp.data.errorMessage
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: ADMIN_GET_PATIENT_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}

export const removePatient = (emailAddress) => async (dispatch) => {
    dispatch({ type: ADMIN_REMOVE_PATIENT_FETCHING });
    request(`admin/patient/${emailAddress}`, "DELETE", null, null)
        .then((resp) => {
            dispatch({
                type: ADMIN_REMOVE_PATIENT_SUCCESS,
                payload: resp.data,
            });
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: ADMIN_REMOVE_PATIENT_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}

export const fetchCounselors = (page) => async (dispatch) => {
    dispatch({ type: ADMIN_GET_COUNSELOR_FETCHING });
    request(`admin/counselor`, "GET", { page }, null)
        .then((resp) => {
            if (resp.data && resp.data.content) {
                dispatch({
                    type: ADMIN_GET_COUNSELOR_SUCCESS,
                    payload: resp.data,
                });
            } else {
                dispatch(openErrorMessageModal(resp.data.message));
                dispatch({
                    type: ADMIN_GET_COUNSELOR_ERROR,
                    errorMessage: resp.data.errorMessage
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: ADMIN_GET_COUNSELOR_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}

export const removeCounselor = (emailAddress) => async (dispatch) => {
    dispatch({ type: ADMIN_REMOVE_COUNSELOR_FETCHING });
    request(`admin/counselor/${emailAddress}`, "DELETE", null, null)
        .then((resp) => {
            dispatch({
                type: ADMIN_REMOVE_COUNSELOR_SUCCESS,
                payload: resp.data,
            });
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: ADMIN_REMOVE_COUNSELOR_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}

export const fetchDoctors = (page) => async (dispatch) => {
    dispatch({ type: ADMIN_GET_DOCTOR_FETCHING });
    request(`admin/doctor`, "GET", { page }, null)
        .then((resp) => {
            if (resp.data && resp.data.content) {
                dispatch({
                    type: ADMIN_GET_DOCTOR_SUCCESS,
                    payload: resp.data,
                });
            } else {
                dispatch(openErrorMessageModal(resp.data.errorMessage));
                dispatch({
                    type: ADMIN_GET_DOCTOR_ERROR,
                    errorMessage: resp.data.errorMessage
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: ADMIN_GET_DOCTOR_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}

export const removeDoctor = (emailAddress) => async (dispatch) => {
    dispatch({ type: ADMIN_REMOVE_DOCTOR_FETCHING });
    request(`admin/doctor/${emailAddress}`, "DELETE", null, null)
        .then((resp) => {
            dispatch({
                type: ADMIN_REMOVE_DOCTOR_SUCCESS,
                payload: resp.data,
            });
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: ADMIN_REMOVE_DOCTOR_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}

const CREATE_USER_APIs = {
    [UserRole.PATIENT]: `patient`,
    [UserRole.COUNSELOR]: `counselor`,
    [UserRole.DOCTOR]: `doctor`,
}
export const createUser = (user, userRole) => async (dispatch) => {
    dispatch({ type: ADMIN_CREATE_USER_FETCHING });
    request(`admin/${CREATE_USER_APIs[userRole]}`, "POST", null, user)
        .then((resp) => {
            if (resp && resp.data && resp.data.success) {
                dispatch({
                    type: ADMIN_CREATE_USER_SUCCESS,
                    payload: resp.data
                });
            } else {
                dispatch(openErrorMessageModal(resp.data.errorMessage));
                dispatch({
                    type: ADMIN_CREATE_USER_ERROR,
                    errorMessage: resp.data.errorMessage
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: ADMIN_CREATE_USER_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}

export const fetchReport = (startDateTime, endDateTime) => async (dispatch) => {
    dispatch({ type: ADMIN_REPORT_FETCHING });
    request(`admin/report`, "GET", { startDateTime, endDateTime }, null)
        .then((resp) => {
            if (resp && resp.data) {
                dispatch({
                    type: ADMIN_REPORT_SUCCESS,
                    payload: resp.data
                });
            } else {
                dispatch(openErrorMessageModal(resp.data.errorMessage));
                dispatch({
                    type: ADMIN_REPORT_ERROR,
                    errorMessage: resp.data.errorMessage
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: ADMIN_REPORT_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}

export const fetchReportParameters = () => async (dispatch) => {
    dispatch({ type: ADMIN_REPORT_PARAMETERS_FETCHING });
    request(`admin/report-parameters`, "GET", null, null)
        .then((resp) => {
            if (resp && resp.data) {
                dispatch({
                    type: ADMIN_REPORT_PARAMETERS_SUCCESS,
                    payload: resp.data
                });
            } else {
                dispatch(openErrorMessageModal(resp.data.errorMessage));
                dispatch({
                    type: ADMIN_REPORT_PARAMETERS_ERROR,
                    errorMessage: resp.data.errorMessage
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: ADMIN_REPORT_PARAMETERS_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}
