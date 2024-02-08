import { RequestState } from "../../lib/types";
import { COUNSELOR_PATIENT_CLEAR, COUNSELOR_PATIENT_ERROR, COUNSELOR_PATIENT_FETCHING, COUNSELOR_PATIENT_LIST_ERROR, COUNSELOR_PATIENT_LIST_FETCHING, COUNSELOR_PATIENT_LIST_SUCCESS, COUNSELOR_PATIENT_SUCCESS, COUNSELOR_REJECT_PATIENT_ERROR, COUNSELOR_REJECT_PATIENT_FETCHING, COUNSELOR_REJECT_PATIENT_SUCCESS, ONLOAD_COUNSELOR_PATIENT_LIST } from "../types";

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
		case ONLOAD_COUNSELOR_PATIENT_LIST: {
			return initialState;
		}
		case COUNSELOR_PATIENT_LIST_FETCHING:
			return {
				...state,
				patientListState: RequestState.FETCHING
			}
		case COUNSELOR_PATIENT_LIST_SUCCESS:
			return {
				...state,
				patientListState: RequestState.COMPLETED,
				patientListPayload: action.payload || []
			}
		case COUNSELOR_PATIENT_LIST_ERROR:
			return {
				...state,
				patientListState: RequestState.ERROR
			}
		case COUNSELOR_PATIENT_FETCHING:
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
		case COUNSELOR_PATIENT_SUCCESS:
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
		case COUNSELOR_PATIENT_ERROR:
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
		case COUNSELOR_PATIENT_CLEAR:
			return {
				...state,
				activePatientState: RequestState.NULL,
				activePatients: {}
			}
		case COUNSELOR_REJECT_PATIENT_FETCHING: {
			return {
				...state,
				rejectPatientRequestState: RequestState.FETCHING
			}
		}
		case COUNSELOR_REJECT_PATIENT_SUCCESS: {
			return {
				...state,
				rejectPatientRequestState: RequestState.COMPLETED
			}
		}
		case COUNSELOR_REJECT_PATIENT_ERROR: {
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
	initialState as counselorInitialState
};
