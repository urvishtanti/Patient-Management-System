import { RequestState } from "../../lib/types";
import { COUNSELOR_APPOINTMENTS_ERROR, COUNSELOR_APPOINTMENTS_FETCHING, COUNSELOR_APPOINTMENTS_FOR_DATE_ERROR, COUNSELOR_APPOINTMENTS_FOR_DATE_FETCHING, COUNSELOR_APPOINTMENTS_FOR_DATE_SUCCESS, COUNSELOR_APPOINTMENTS_SUCCESS, COUNSELOR_MAKE_APPOINTMENT_ERROR, COUNSELOR_MAKE_APPOINTMENT_FETCHING, COUNSELOR_MAKE_APPOINTMENT_SUCCESS, ONLOAD_COUNSELOR_APPOINTMENTS } from "../types";

const initialState = {
	state: RequestState.NULL,
	payload: {},
	errorMessage: "",
	appointment: { state: RequestState.NULL }
}

const reducer = (state, action) => {
	if (typeof state === 'undefined') state = initialState;
	switch (action.type) {
		case COUNSELOR_APPOINTMENTS_FETCHING:
			return {
				...state,
				state: RequestState.FETCHING,
				payload: {}
			}
		case COUNSELOR_APPOINTMENTS_SUCCESS:
			return {
				...state,
				state: RequestState.COMPLETED,
				payload: action.payload
			}
		case COUNSELOR_APPOINTMENTS_ERROR:
			return {
				...state,
				state: RequestState.ERROR,
				errorMessage: action.errorMessage
			}
		case COUNSELOR_APPOINTMENTS_FOR_DATE_FETCHING: {
			return {
				...state,
				appointment: {
					state: RequestState.FETCHING
				}
			}
		}
		case COUNSELOR_APPOINTMENTS_FOR_DATE_SUCCESS: {
			return {
				...state,
				appointment: {
					state: RequestState.COMPLETED,
					payload: action.payload
				}
			}
		}
		case COUNSELOR_APPOINTMENTS_FOR_DATE_ERROR: {
			return {
				...state,
				appointment: {
					state: RequestState.ERROR,
					errorMessage: action.errorMessage
				}
			}
		}
		case COUNSELOR_MAKE_APPOINTMENT_FETCHING: {
			const appointmentRequests = {
				state: RequestState.FETCHING
			}
			return {
				...state,
				appointmentRequests
			}
		}
		case COUNSELOR_MAKE_APPOINTMENT_SUCCESS: {
			const appointmentRequests = {
				state: RequestState.COMPLETED
			}
			return {
				...state,
				appointmentRequests
			}
		}
		case COUNSELOR_MAKE_APPOINTMENT_ERROR: {
			const appointmentRequests = {
				state: RequestState.ERROR,
				errorMessage: action.errorMessage
			}
			return {
				...state,
				appointmentRequests
			}
		}
		case ONLOAD_COUNSELOR_APPOINTMENTS: {
			return initialState;
		}
		default:
			return state;
	}
}
export {
	reducer as default,
	initialState as counselorAppointmentsInitialState
};
