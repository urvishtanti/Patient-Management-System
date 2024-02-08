import { RequestState } from "../../lib/types";
import { COUNSELOR_ASSIGN_DOCTOR_ERROR, COUNSELOR_ASSIGN_DOCTOR_FETCHING, COUNSELOR_ASSIGN_DOCTOR_SUCCESS, COUNSELOR_DOCTOR_LIST_ERROR, COUNSELOR_DOCTOR_LIST_FETCHING, COUNSELOR_DOCTOR_LIST_SUCCESS, COUNSELOR_PATIENT_LOD_ERROR, COUNSELOR_PATIENT_LOD_FETCHING, COUNSELOR_PATIENT_LOD_SUCCESS } from "../types";

const initialState = {
	state: RequestState.NULL,
	payload: {},
	errorMessage: "",
	activePatients: {},
	assignDoctorStates: {}
}

const reducer = (state, action) => {
	if (typeof state === 'undefined') state = initialState;
	switch (action.type) {
		case COUNSELOR_DOCTOR_LIST_FETCHING:
			return {
				...state,
				state: RequestState.FETCHING,
				payload: {}
			}
		case COUNSELOR_DOCTOR_LIST_SUCCESS:
			return {
				...state,
				state: RequestState.COMPLETED,
				payload: action.payload
			}
		case COUNSELOR_DOCTOR_LIST_ERROR:
			return {
				...state,
				state: RequestState.ERROR,
				errorMessage: action.errorMessage
			}
		case COUNSELOR_PATIENT_LOD_FETCHING: {
			const activePatients = state.activePatients;
			activePatients[action.activePatientId] = {
				state: RequestState.FETCHING
			}
			return {
				...state,
				activePatients
			}
		}
		case COUNSELOR_PATIENT_LOD_SUCCESS: {
			const activePatients = state.activePatients;
			activePatients[action.activePatientId] = {
				state: RequestState.COMPLETED,
				activePatient: action.activePatient
			}
			return {
				...state,
				activePatients
			}
		}
		case COUNSELOR_PATIENT_LOD_ERROR: {
			const activePatients = state.activePatients;
			activePatients[action.activePatientId] = {
				state: RequestState.ERROR
			}
			return {
				...state,
				activePatients
			}
		}
		case COUNSELOR_ASSIGN_DOCTOR_FETCHING: {
			const assignDoctorStates = state.assignDoctorStates;
			assignDoctorStates[action.activePatientId] = {
				state: RequestState.FETCHING
			};
			return {
				...state,
				assignDoctorStates: assignDoctorStates
			}
		}
		case COUNSELOR_ASSIGN_DOCTOR_SUCCESS: {
			const assignDoctorStates = state.assignDoctorStates;
			assignDoctorStates[action.activePatientId].state = RequestState.COMPLETED;
			return {
				...state,
				assignDoctorStates: assignDoctorStates
			}
		}
		case COUNSELOR_ASSIGN_DOCTOR_ERROR: {
			const assignDoctorStates = state.assignDoctorStates;
			assignDoctorStates[action.activePatientId].state = RequestState.ERROR;
			assignDoctorStates[action.activePatientId].errorMessage = action.errorMessage;
			return {
				...state,
				assignDoctorStates: assignDoctorStates
			}
		}
		default:
			return state;
	}
}
export {
	reducer as default,
	initialState as counselorDoctorListInitialState
};
