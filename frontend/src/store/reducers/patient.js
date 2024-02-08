import { RequestState } from "../../lib/types";
import { ONLOAD_PATIENT_ASSESSMENT_PAGE, ONLOAD_PATIENT_STATUS_PAGE, PATIENT_ASSESSMENT_QUESTIONS_ERROR, PATIENT_ASSESSMENT_QUESTIONS_FETCHING, PATIENT_ASSESSMENT_QUESTIONS_SUCCESS, PATIENT_ASSESSMENT_SUBMIT_ERROR, PATIENT_ASSESSMENT_SUBMIT_FETCHING, PATIENT_ASSESSMENT_SUBMIT_SUCCESS, PATIENT_RECORD_STATUS_ERROR, PATIENT_RECORD_STATUS_FETCHING, PATIENT_RECORD_STATUS_SUCCESS } from "../types";

const initialState = {
	errorMessage: "",
	questionsState: RequestState.NULL,
	questions: null,
	questionSubmitState: RequestState.NULL,
	patientRecordStatusPayload: {},
	patientRecordStatusState: RequestState.NULL
}

const reducer = (state, action) => {
	if (typeof state === 'undefined') state = initialState;
	switch (action.type) {
		case ONLOAD_PATIENT_ASSESSMENT_PAGE:
			return {
				...state,
				questionSubmitState: RequestState.NULL,
				errorMessage: ""
			}
		case ONLOAD_PATIENT_STATUS_PAGE:
			return {
				...state,
				patientRecordStatusState: RequestState.NULL,
				patientRecordStatusPayload: {}
			}
		case PATIENT_ASSESSMENT_QUESTIONS_FETCHING:
			return {
				...state,
				questionsState: RequestState.FETCHING,
				errorMessage: ""
			}
		case PATIENT_ASSESSMENT_QUESTIONS_SUCCESS:
			return {
				...state,
				questions: action.questions,
				errorMessage: "",
				questionsState: RequestState.COMPLETED
			}
		case PATIENT_ASSESSMENT_QUESTIONS_ERROR:
			return {
				...state,
				questions: null,
				errorMessage: action.errorMessage,
				questionsState: RequestState.ERROR
			}
		case PATIENT_ASSESSMENT_SUBMIT_FETCHING:
			return {
				...state,
				questionSubmitState: RequestState.FETCHING,
				errorMessage: ""
			}
		case PATIENT_ASSESSMENT_SUBMIT_SUCCESS:
			return {
				...state,
				questionSubmitState: RequestState.COMPLETED,
				errorMessage: ""
			}
		case PATIENT_ASSESSMENT_SUBMIT_ERROR:
			return {
				...state,
				questionSubmitState: RequestState.ERROR,
				errorMessage: action.errorMessage
			}
		case PATIENT_RECORD_STATUS_FETCHING:
			return {
				...state,
				patientRecordStatusState: RequestState.FETCHING,
				errorMessage: ""
			}
		case PATIENT_RECORD_STATUS_SUCCESS:
			return {
				...state,
				patientRecordStatusState: RequestState.COMPLETED,
				patientRecordStatusPayload: action.payload
			}
		case PATIENT_RECORD_STATUS_ERROR:
			return {
				...state,
				patientRecordStatusState: RequestState.ERROR,
				errorMessage: action.errorMessage
			}
		default:
			return state;
	}
}
export {
	reducer as default,
	initialState as patientInitialState
};
