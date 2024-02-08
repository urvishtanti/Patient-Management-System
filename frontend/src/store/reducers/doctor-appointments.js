import { RequestState } from "../../lib/types";
import { DOCTOR_APPOINTMENTS_ERROR, DOCTOR_APPOINTMENTS_FETCHING, DOCTOR_APPOINTMENTS_FOR_DATE_ERROR, DOCTOR_APPOINTMENTS_FOR_DATE_FETCHING, DOCTOR_APPOINTMENTS_FOR_DATE_SUCCESS, DOCTOR_APPOINTMENTS_SUCCESS, DOCTOR_MAKE_APPOINTMENT_ERROR, DOCTOR_MAKE_APPOINTMENT_FETCHING, DOCTOR_MAKE_APPOINTMENT_SUCCESS, ONLOAD_DOCTOR_APPOINTMENTS } from "../types";

const initialState = {
	state: RequestState.NULL,
	payload: {},
	errorMessage: "",
	appointment: { state: RequestState.NULL }
}

const reducer = (state, action) => {
	if (typeof state === 'undefined') state = initialState;
	switch (action.type) {
		case DOCTOR_APPOINTMENTS_FETCHING:
			return {
				...state,
				state: RequestState.FETCHING,
				payload: {}
			}
		case DOCTOR_APPOINTMENTS_SUCCESS:
			return {
				...state,
				state: RequestState.COMPLETED,
				payload: action.payload
			}
		case DOCTOR_APPOINTMENTS_ERROR:
			return {
				...state,
				state: RequestState.ERROR,
				errorMessage: action.errorMessage
			}
		case DOCTOR_APPOINTMENTS_FOR_DATE_FETCHING: {
			return {
				...state,
				appointment: {
					state: RequestState.FETCHING
				}
			}
		}
		case DOCTOR_APPOINTMENTS_FOR_DATE_SUCCESS: {
			return {
				...state,
				appointment: {
					state: RequestState.COMPLETED,
					payload: action.payload
				}
			}
		}
		case DOCTOR_APPOINTMENTS_FOR_DATE_ERROR: {
			return {
				...state,
				appointment: {
					state: RequestState.ERROR,
					errorMessage: action.errorMessage
				}
			}
		}
		case DOCTOR_MAKE_APPOINTMENT_FETCHING: {
			const appointmentRequests = {
				state: RequestState.FETCHING
			}
			return {
				...state,
				appointmentRequests
			}
		}
		case DOCTOR_MAKE_APPOINTMENT_SUCCESS: {
			const appointmentRequests = {
				state: RequestState.COMPLETED
			}
			return {
				...state,
				appointmentRequests
			}
		}
		case DOCTOR_MAKE_APPOINTMENT_ERROR: {
			const appointmentRequests = {
				state: RequestState.ERROR,
				errorMessage: action.errorMessage
			}
			return {
				...state,
				appointmentRequests
			}
		}
		case ONLOAD_DOCTOR_APPOINTMENTS: {
			return initialState;
		}
		default:
			return state;
	}
}
export {
	reducer as default,
	initialState as doctorAppointmentsInitialState
};
