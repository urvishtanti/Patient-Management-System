import request from "../../lib/request";
import { COUNSELOR_PATIENT_CLEAR, COUNSELOR_PATIENT_ERROR, COUNSELOR_PATIENT_FETCHING, COUNSELOR_PATIENT_LIST_ERROR, COUNSELOR_PATIENT_LIST_FETCHING, COUNSELOR_PATIENT_LIST_SUCCESS, COUNSELOR_PATIENT_SUCCESS, COUNSELOR_REJECT_PATIENT_ERROR, COUNSELOR_REJECT_PATIENT_FETCHING, COUNSELOR_REJECT_PATIENT_SUCCESS, ONLOAD_COUNSELOR_PATIENT_LIST } from "../types";
import { onLoadCounselorAppointmentPage } from "./counselor-appointments";
import { openErrorMessageModal } from "./gui";

export const fetchPatientList = (page) => async (dispatch) => {
    dispatch({ type: COUNSELOR_PATIENT_LIST_FETCHING });
    request(`counselor/patient`, "GET", { page }, null)
        .then((resp) => {
            if (resp.data && resp.data.content) {
                dispatch({
                    type: COUNSELOR_PATIENT_LIST_SUCCESS,
                    payload: resp.data,
                });
            } else {
                dispatch({
                    type: COUNSELOR_PATIENT_LIST_ERROR,
                    errorMessage: resp.data.errorMessage
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: COUNSELOR_PATIENT_LIST_ERROR,
                errorMessage: exception.data.errorMessage,
            });
        });
}

export const fetchPatient = (patientId) => async (dispatch) => {
    dispatch({ type: COUNSELOR_PATIENT_FETCHING, patientId: patientId });
    request(`counselor/patient/${patientId}`, "GET", null, null)
        .then((resp) => {
            if (resp.data) {
                dispatch({
                    type: COUNSELOR_PATIENT_SUCCESS,
                    activePatient: resp.data,
                });
            } else {
                dispatch({
                    type: COUNSELOR_PATIENT_ERROR,
                    errorMessage: resp.data.errorMessage,
                    patientId: patientId
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: COUNSELOR_PATIENT_ERROR,
                errorMessage: exception.data.errorMessage,
                patientId: patientId
            });
        });
}

export const clearPatient = () => (dispatch) => {
    dispatch({
        type: COUNSELOR_PATIENT_CLEAR
    })
}

export const onLoadCounselorPage = () => (dispatch) => {
    dispatch({
        type: ONLOAD_COUNSELOR_PATIENT_LIST
    })
    dispatch(onLoadCounselorAppointmentPage());
}

export const rejectPatient = (patientRecordId) => async (dispatch) => {
    dispatch({ type: COUNSELOR_REJECT_PATIENT_FETCHING, id: patientRecordId });
    request(`counselor/patient/${patientRecordId}`, "DELETE", null, null)
        .then((resp) => {
            dispatch({
                type: COUNSELOR_REJECT_PATIENT_SUCCESS
            });
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: COUNSELOR_REJECT_PATIENT_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}