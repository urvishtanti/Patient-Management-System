import { RequestState } from "../../lib/types";
import { ADMIN_CREATE_USER_ERROR, ADMIN_CREATE_USER_FETCHING, ADMIN_CREATE_USER_SUCCESS, ADMIN_GET_COUNSELOR_ERROR, ADMIN_GET_COUNSELOR_FETCHING, ADMIN_GET_COUNSELOR_SUCCESS, ADMIN_GET_DOCTOR_ERROR, ADMIN_GET_DOCTOR_FETCHING, ADMIN_GET_DOCTOR_SUCCESS, ADMIN_GET_PATIENT_ERROR, ADMIN_GET_PATIENT_FETCHING, ADMIN_GET_PATIENT_SUCCESS, ADMIN_REMOVE_COUNSELOR_ERROR, ADMIN_REMOVE_COUNSELOR_FETCHING, ADMIN_REMOVE_COUNSELOR_SUCCESS, ADMIN_REMOVE_DOCTOR_ERROR, ADMIN_REMOVE_DOCTOR_FETCHING, ADMIN_REMOVE_DOCTOR_SUCCESS, ADMIN_REMOVE_PATIENT_ERROR, ADMIN_REMOVE_PATIENT_FETCHING, ADMIN_REMOVE_PATIENT_SUCCESS, ADMIN_REPORT_ERROR, ADMIN_REPORT_FETCHING, ADMIN_REPORT_PARAMETERS_ERROR, ADMIN_REPORT_PARAMETERS_FETCHING, ADMIN_REPORT_PARAMETERS_SUCCESS, ADMIN_REPORT_SUCCESS } from "../types";

const initialState = {
	patient: {
		requestState: RequestState.NULL,
		payload: []
	},
	counselor: {
		requestState: RequestState.NULL,
		payload: []
	},
	doctor: {
		requestState: RequestState.NULL,
		payload: []
	},
	createRequest: {
		state: RequestState.NULL,
		payload: "",
		errorMessage: ""
	},
	reportParameters: {
	},
	reportData: {

	}
}

const reducer = (state, action) => {
	if (typeof state === 'undefined') state = initialState;
	switch (action.type) {
		case ADMIN_GET_PATIENT_FETCHING: {
			return {
				...state,
				patient: {
					requestState: RequestState.FETCHING
				}
			}
		}
		case ADMIN_GET_PATIENT_SUCCESS: {
			return {
				...state,
				patient: {
					requestState: RequestState.COMPLETED,
					payload: action.payload
				}
			}
		}
		case ADMIN_GET_PATIENT_ERROR: {
			return {
				...state,
				patient: {
					requestState: RequestState.ERROR,
					errorMessage: action.errorMessage
				}
			}
		}
		case ADMIN_REMOVE_PATIENT_FETCHING: {
			return {
				...state,
				patient: {
					rejectRequestState: RequestState.FETCHING
				}
			}
		}
		case ADMIN_REMOVE_PATIENT_SUCCESS: {
			return {
				...state,
				patient: {
					rejectRequestState: RequestState.COMPLETED
				}
			}
		}
		case ADMIN_REMOVE_PATIENT_ERROR: {
			return {
				...state,
				patient: {
					rejectRequestState: RequestState.COMPLETED,
					rejectErrorMessage: action.errorMessage
				}
			}
		}

		case ADMIN_GET_COUNSELOR_FETCHING: {
			return {
				...state,
				counselor: {
					requestState: RequestState.FETCHING
				}
			}
		}
		case ADMIN_GET_COUNSELOR_SUCCESS: {
			return {
				...state,
				counselor: {
					requestState: RequestState.COMPLETED,
					payload: action.payload
				}
			}
		}
		case ADMIN_GET_COUNSELOR_ERROR: {
			return {
				...state,
				counselor: {
					requestState: RequestState.ERROR,
					errorMessage: action.errorMessage
				}
			}
		}
		case ADMIN_REMOVE_COUNSELOR_FETCHING: {
			return {
				...state,
				counselor: {
					rejectRequestState: RequestState.FETCHING
				}
			}
		}
		case ADMIN_REMOVE_COUNSELOR_SUCCESS: {
			return {
				...state,
				counselor: {
					rejectRequestState: RequestState.COMPLETED
				}
			}
		}
		case ADMIN_REMOVE_COUNSELOR_ERROR: {
			return {
				...state,
				counselor: {
					rejectRequestState: RequestState.COMPLETED,
					rejectErrorMessage: action.errorMessage
				}
			}
		}

		case ADMIN_GET_DOCTOR_FETCHING: {
			return {
				...state,
				doctor: {
					requestState: RequestState.FETCHING
				}
			}
		}
		case ADMIN_GET_DOCTOR_SUCCESS: {
			return {
				...state,
				doctor: {
					requestState: RequestState.COMPLETED,
					payload: action.payload
				}
			}
		}
		case ADMIN_GET_DOCTOR_ERROR: {
			return {
				...state,
				doctor: {
					requestState: RequestState.ERROR,
					errorMessage: action.errorMessage
				}
			}
		}
		case ADMIN_REMOVE_DOCTOR_FETCHING: {
			return {
				...state,
				doctor: {
					rejectRequestState: RequestState.FETCHING
				}
			}
		}
		case ADMIN_REMOVE_DOCTOR_SUCCESS: {
			return {
				...state,
				doctor: {
					rejectRequestState: RequestState.COMPLETED
				}
			}
		}
		case ADMIN_REMOVE_DOCTOR_ERROR: {
			return {
				...state,
				doctor: {
					rejectRequestState: RequestState.COMPLETED,
					rejectErrorMessage: action.errorMessage
				}
			}
		}
		case ADMIN_CREATE_USER_FETCHING: {
			return {
				...state,
				createRequest: {
					state: RequestState.FETCHING
				}
			}
		}
		case ADMIN_CREATE_USER_SUCCESS: {
			return {
				...state,
				createRequest: {
					state: RequestState.COMPLETED,
					payload: action.payload
				}
			}
		}
		case ADMIN_CREATE_USER_ERROR: {
			return {
				...state,
				createRequest: {
					state: RequestState.ERROR,
					errorMessage: action.errorMessage
				}
			}
		}

		case ADMIN_REPORT_FETCHING: {
			return {
				...state,
				reportData: {
					state: RequestState.FETCHING
				}
			}
		}
		case ADMIN_REPORT_SUCCESS: {
			return {
				...state,
				reportData: {
					state: RequestState.COMPLETED,
					payload: action.payload
				}
			}
		}
		case ADMIN_REPORT_ERROR: {
			return {
				...state,
				reportData: {
					state: RequestState.ERROR,
					errorMessage: action.errorMessage
				}
			}
		}
		case ADMIN_REPORT_PARAMETERS_FETCHING: {
			return {
				...state,
				reportParameters: {
					state: RequestState.FETCHING
				}
			}
		}
		case ADMIN_REPORT_PARAMETERS_SUCCESS: {
			return {
				...state,
				reportParameters: {
					state: RequestState.COMPLETED,
					payload: action.payload
				}
			}
		}
		case ADMIN_REPORT_PARAMETERS_ERROR: {
			return {
				...state,
				reportParameters: {
					state: RequestState.ERROR,
					errorMessage: action.errorMessage
				}
			}
		}
		default:
			return state;
	}
}
export {
	reducer as default,
	initialState as adminInitialState
};
