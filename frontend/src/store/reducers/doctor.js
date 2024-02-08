import { RequestState } from "../../lib/types";
import { DOCTOR_PATIENT_CLEAR, DOCTOR_PATIENT_ERROR, DOCTOR_PATIENT_FETCHING, DOCTOR_PATIENT_LIST_ERROR, DOCTOR_PATIENT_LIST_FETCHING, DOCTOR_PATIENT_LIST_SUCCESS, DOCTOR_PATIENT_SUCCESS, DOCTOR_REJECT_PATIENT_ERROR, DOCTOR_REJECT_PATIENT_FETCHING, DOCTOR_REJECT_PATIENT_SUCCESS, ONLOAD_DOCTOR_PATIENT_LIST } from "../types";

const initialState = {
	patientListState: RequestState.NULL,
	patientListPayload: [],
	activePatientState: RequestState.NULL,
	activePatients: {},
	rejectPatientRequestState: RequestState.NULL,
	rejectPatientErrorMessage: ""
}

const reducer = (state, action) => {
	if (typeof state === 'undefined') state = initialState;
	switch (action.type) {
		case ONLOAD_DOCTOR_PATIENT_LIST: {
			return initialState;
		}
		case DOCTOR_PATIENT_LIST_FETCHING:
			return {
				...state,
				patientListState: RequestState.FETCHING
			}
		case DOCTOR_PATIENT_LIST_SUCCESS:
			return {
				...state,
				patientListState: RequestState.COMPLETED,
				patientListPayload: action.payload || []
			}
		case DOCTOR_PATIENT_LIST_ERROR:
			return {
				...state,
				patientListState: RequestState.ERROR
			}
		case DOCTOR_PATIENT_FETCHING:
			if (action.patientId) {
				const activePatients = state.activePatients;
				activePatients[action.patientId] = {
					state: RequestState.NULL
				};
				return {
					...state,
					activePatientState: RequestState.FETCHING,
					activePatients: activePatients,
				}
			}
			return state;
		case DOCTOR_PATIENT_SUCCESS:
			if (action.activePatient.recordId) {
				const activePatients = state.activePatients;
				activePatients[action.activePatient.recordId] = action.activePatient;
				activePatients[action.activePatient.recordId].state = RequestState.COMPLETED;
				return {
					...state,
					activePatientState: RequestState.COMPLETED,
					activePatients: activePatients
				}
			}
			return state;
		case DOCTOR_PATIENT_ERROR:
			if (action.activePatient.recordId) {
				const activePatients = state.activePatients;
				activePatients[action.patientId].state = RequestState.ERROR;
				return {
					...state,
					activePatientState: RequestState.ERROR,
					activePatients: activePatients
				}
			}
			return state;
		case DOCTOR_PATIENT_CLEAR:
			return {
				...state,
				activePatientState: RequestState.NULL,
				activePatients: {}
			}
		case DOCTOR_REJECT_PATIENT_FETCHING: {
			return {
				...state,
				rejectPatientRequestState: RequestState.FETCHING
			}
		}
		case DOCTOR_REJECT_PATIENT_SUCCESS: {
			return {
				...state,
				rejectPatientRequestState: RequestState.COMPLETED
			}
		}
		case DOCTOR_REJECT_PATIENT_ERROR: {
			return {
				...state,
				rejectPatientRequestState: RequestState.ERROR,
				rejectPatientErrorMessage: action.errorMessage
			}
		}
		default:
			return state;
	}
}
export {
	reducer as default,
	initialState as doctorInitialState
};
