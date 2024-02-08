import request from "../../lib/request";
import { COUNSELOR_ASSIGN_DOCTOR_ERROR, COUNSELOR_ASSIGN_DOCTOR_FETCHING, COUNSELOR_ASSIGN_DOCTOR_SUCCESS, COUNSELOR_DOCTOR_LIST_ERROR, COUNSELOR_DOCTOR_LIST_FETCHING, COUNSELOR_DOCTOR_LIST_SUCCESS, COUNSELOR_PATIENT_LOD_ERROR, COUNSELOR_PATIENT_LOD_FETCHING, COUNSELOR_PATIENT_LOD_SUCCESS } from "../types";
import { openErrorMessageModal, openSuccessMessageModal } from "./gui";

export const fetchDoctorList = (page) => async (dispatch) => {
    dispatch({ type: COUNSELOR_DOCTOR_LIST_FETCHING });
    request(`counselor/doctor`, "GET", { page }, null)
        .then((resp) => {
            if (resp.data && resp.data.content) {
                dispatch({
                    type: COUNSELOR_DOCTOR_LIST_SUCCESS,
                    payload: resp.data,
                });
            } else {
                dispatch({
                    type: COUNSELOR_DOCTOR_LIST_ERROR,
                    errorMessage: ""
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: COUNSELOR_DOCTOR_LIST_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}

export const fetchPatient = (patientId) => async (dispatch) => {
    dispatch({ type: COUNSELOR_PATIENT_LOD_FETCHING, patientId: patientId });
    request(`counselor/patient/${patientId}`, "GET", null, null)
        .then((resp) => {
            if (resp.data) {
                dispatch({
                    type: COUNSELOR_PATIENT_LOD_SUCCESS,
                    activePatient: resp.data,
                    activePatientId: patientId
                });
            } else {
                dispatch({
                    type: COUNSELOR_PATIENT_LOD_ERROR,
                    errorMessage: "",
                    activePatientId: patientId
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: COUNSELOR_PATIENT_LOD_ERROR,
                errorMessage: exception.data.errorMessage,
                activePatientId: patientId
            });
        });
}

export const assignDoctorToPatient = (activePatientId, doctorRegistrationNumber) => async (dispatch) => {
    if (!activePatientId || !doctorRegistrationNumber) {
        return;
    }
    dispatch({ type: COUNSELOR_ASSIGN_DOCTOR_FETCHING, activePatientId });
    request(`counselor/doctor`, "POST", null, {
        activePatientId,
        doctorRegistrationNumber
    })
        .then((resp) => {
            dispatch(openSuccessMessageModal("Patient record forwarded successfully!"));
            dispatch({
                type: COUNSELOR_ASSIGN_DOCTOR_SUCCESS,
                activePatientId
            });
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: COUNSELOR_ASSIGN_DOCTOR_ERROR,
                errorMessage: exception.data.errorMessage,
                activePatientId
            });
        });
}
