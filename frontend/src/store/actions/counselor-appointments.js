import request from "../../lib/request";
import { COUNSELOR_APPOINTMENTS_ERROR, COUNSELOR_APPOINTMENTS_FETCHING, COUNSELOR_APPOINTMENTS_FOR_DATE_ERROR, COUNSELOR_APPOINTMENTS_FOR_DATE_FETCHING, COUNSELOR_APPOINTMENTS_FOR_DATE_SUCCESS, COUNSELOR_APPOINTMENTS_SUCCESS, COUNSELOR_MAKE_APPOINTMENT_ERROR, COUNSELOR_MAKE_APPOINTMENT_FETCHING, COUNSELOR_MAKE_APPOINTMENT_SUCCESS, ONLOAD_COUNSELOR_APPOINTMENTS } from "../types";
import { openErrorMessageModal, openSuccessMessageModal } from "./gui";

export const fetchAppointments = (page) => async (dispatch) => {
    dispatch({ type: COUNSELOR_APPOINTMENTS_FETCHING });
    request(`counselor/patient/appointment`, "GET", { page }, null)
        .then((resp) => {
            if (resp.data && resp.data.content) {
                dispatch({
                    type: COUNSELOR_APPOINTMENTS_SUCCESS,
                    payload: resp.data,
                });
            } else {
                dispatch({
                    type: COUNSELOR_APPOINTMENTS_ERROR,
                    errorMessage: resp.data.errorMessage
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: COUNSELOR_APPOINTMENTS_ERROR,
                errorMessage: exception.data.errorMessage
            });
        });
}

export const fetchAppointmentsForDate = (date) => async (dispatch) => {
    if (!date) {
        return;
    }
    dispatch({ type: COUNSELOR_APPOINTMENTS_FOR_DATE_FETCHING, date });
    request(`counselor/patient/appointments`, "POST", null, { date })
        .then((resp) => {
            if (resp && resp.data) {
                dispatch({
                    type: COUNSELOR_APPOINTMENTS_FOR_DATE_SUCCESS,
                    payload: resp.data,
                    date
                });
            } else {
                dispatch({
                    type: COUNSELOR_APPOINTMENTS_FOR_DATE_ERROR,
                    errorMessage: resp.data.errorMessage,
                    date
                });
            }
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: COUNSELOR_APPOINTMENTS_FOR_DATE_ERROR,
                errorMessage: exception.data.errorMessage,
                date
            });
        });
}

export const makeAppointment = (patientRecordId, startDateTime, endDateTime) => async (dispatch) => {
    if (!patientRecordId || !startDateTime || !endDateTime) {
        return;
    }
    dispatch({ type: COUNSELOR_MAKE_APPOINTMENT_FETCHING, id: patientRecordId });
    request(`counselor/patient/appointment`, "POST", null, {
        patientRecordId,
        startDateTime,
        endDateTime
    })
        .then((resp) => {
            dispatch(openSuccessMessageModal("Your appointment was booked!"));
            dispatch({
                type: COUNSELOR_MAKE_APPOINTMENT_SUCCESS,
                id: patientRecordId
            });
        })
        .catch((exception) => {
            // handle error.
            dispatch(openErrorMessageModal(exception.data.errorMessage));
            dispatch({
                type: COUNSELOR_MAKE_APPOINTMENT_ERROR,
                errorMessage: exception.data.errorMessage,
                id: patientRecordId
            });
        });
}

export const onLoadCounselorAppointmentPage = () => (dispatch) => {
    dispatch({
        type: ONLOAD_COUNSELOR_APPOINTMENTS
    })
}