import request from "../../lib/request";
import { DOCTOR_PATIENT_CLEAR, DOCTOR_PATIENT_ERROR, DOCTOR_PATIENT_FETCHING, DOCTOR_PATIENT_LIST_ERROR, DOCTOR_PATIENT_LIST_FETCHING, DOCTOR_PATIENT_LIST_SUCCESS, DOCTOR_PATIENT_SUCCESS, DOCTOR_REJECT_PATIENT_ERROR, DOCTOR_REJECT_PATIENT_FETCHING, DOCTOR_REJECT_PATIENT_SUCCESS, ONLOAD_DOCTOR_PATIENT_LIST } from "../types";
import { onLoadDoctorAppointmentPage } from "./doctor-appointments";
import { openErrorMessageModal } from "./gui";

export const fetchPatientList = () => async (dispatch) => {
    dispatch({ type: DOCTOR_PATIENT_LIST_FETCHING });
    request(`doctor/patient`, "GET", null, null)
        .then((resp) => {
            if (resp.data && resp.data.content) {
                dispatch({
                    type: DOCTOR_PATIENT_LIST_SUCCESS,
                    payload: resp.data,
                });
            } else {
                dispatch({
                    type: DOCTOR_PATIENT_LIST_ERROR,
                    errorMessage: resp.data.errorMessage
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: DOCTOR_PATIENT_LIST_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}

export const fetchPatient = (patientId) => async (dispatch) => {
    dispatch({ type: DOCTOR_PATIENT_FETCHING, patientId: patientId });
    request(`doctor/patient/${patientId}`, "GET", null, null)
        .then((resp) => {
            if (resp.data) {
                dispatch({
                    type: DOCTOR_PATIENT_SUCCESS,
                    activePatient: resp.data,
                });
            } else {
                dispatch({
                    type: DOCTOR_PATIENT_ERROR,
                    errorMessage: resp.data.errorMessage,
                    patientId: patientId
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: DOCTOR_PATIENT_ERROR,
                errorMessage: exception.data.errorMessage,
                patientId: patientId
            });
        });
}

export const clearPatient = () => (dispatch) => {
    dispatch({
        type: DOCTOR_PATIENT_CLEAR
    })
}

export const onLoadDoctorPage = () => (dispatch) => {
    dispatch({
        type: ONLOAD_DOCTOR_PATIENT_LIST
    })
    dispatch(onLoadDoctorAppointmentPage());
}

export const rejectPatient = (patientRecordId) => async (dispatch) => {
    dispatch({ type: DOCTOR_REJECT_PATIENT_FETCHING, id: patientRecordId });
    request(`doctor/patient/${patientRecordId}`, "DELETE", null, null)
        .then((resp) => {
            dispatch({
                type: DOCTOR_REJECT_PATIENT_SUCCESS
            });
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: DOCTOR_REJECT_PATIENT_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}