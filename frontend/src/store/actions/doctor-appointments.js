import { PLEASE_TRY_AGAIN } from "../../lib/messages";
import request from "../../lib/request";
import { DOCTOR_APPOINTMENTS_ERROR, DOCTOR_APPOINTMENTS_FETCHING, DOCTOR_APPOINTMENTS_FOR_DATE_ERROR, DOCTOR_APPOINTMENTS_FOR_DATE_FETCHING, DOCTOR_APPOINTMENTS_FOR_DATE_SUCCESS, DOCTOR_APPOINTMENTS_SUCCESS, DOCTOR_MAKE_APPOINTMENT_ERROR, DOCTOR_MAKE_APPOINTMENT_FETCHING, DOCTOR_MAKE_APPOINTMENT_SUCCESS, ONLOAD_DOCTOR_APPOINTMENTS } from "../types";
import { openErrorMessageModal, openSuccessMessageModal } from "./gui";

export const fetchAppointments = (page) => async (dispatch) => {
    dispatch({ type: DOCTOR_APPOINTMENTS_FETCHING });
    request(`doctor/patient/appointment`, "GET", { page }, null)
        .then((resp) => {
            if (resp.data && resp.data.content) {
                dispatch({
                    type: DOCTOR_APPOINTMENTS_SUCCESS,
                    payload: resp.data,
                });
            } else {
                dispatch({
                    type: DOCTOR_APPOINTMENTS_ERROR,
                    errorMessage: resp.data.errorMessage
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: DOCTOR_APPOINTMENTS_ERROR,
                errorMessage: PLEASE_TRY_AGAIN
            });
        });
}


export const fetchAppointmentsForDate = (date) => async (dispatch) => {
    dispatch({ type: DOCTOR_APPOINTMENTS_FOR_DATE_FETCHING, date });
    request(`doctor/patient/appointments`, "POST", null, { date })
        .then((resp) => {
            if (resp && resp.data) {
                dispatch({
                    type: DOCTOR_APPOINTMENTS_FOR_DATE_SUCCESS,
                    payload: resp.data,
                    date
                });
            } else {
                dispatch({
                    type: DOCTOR_APPOINTMENTS_FOR_DATE_ERROR,
                    errorMessage: resp.data.errorMessage,
                    date
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: DOCTOR_APPOINTMENTS_FOR_DATE_ERROR,
                errorMessage: exception.data.errorMessage,
                date
            });
        });
}

export const makeAppointment = (patientRecordId, startDateTime, endDateTime) => async (dispatch) => {
    if (!patientRecordId || !startDateTime || !endDateTime) {
        return;
    }
    dispatch({ type: DOCTOR_MAKE_APPOINTMENT_FETCHING, id: patientRecordId });
    request(`doctor/patient/appointment`, "POST", null, {
        patientRecordId,
        startDateTime,
        endDateTime
    })
        .then((resp) => {
            dispatch(openSuccessMessageModal("Your appointment was booked!"));
            dispatch({
                type: DOCTOR_MAKE_APPOINTMENT_SUCCESS,
                id: patientRecordId
            });
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: DOCTOR_MAKE_APPOINTMENT_ERROR,
                errorMessage: exception.data.errorMessage,
                id: patientRecordId
            });
        });
}

export const onLoadDoctorAppointmentPage = () => (dispatch) => {
    dispatch({
        type: ONLOAD_DOCTOR_APPOINTMENTS
    })
}