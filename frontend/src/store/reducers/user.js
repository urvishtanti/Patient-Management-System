import { RequestState, UserRole } from "../../lib/types";
import { RESET_USER_LOGIN, RESET_USER_SIGNUP, USER_LOGIN_ERROR, USER_LOGIN_FETCHING, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_ERROR, USER_PROFILE_FETCHING, USER_PROFILE_SUCCESS, USER_PROFILE_UPDATE_ERROR, USER_PROFILE_UPDATE_FETCHING, USER_PROFILE_UPDATE_SUCCESS, USER_SIGNUP_ERROR, USER_SIGNUP_FETCHING, USER_SIGNUP_SUCCESS } from "../types";

const initialState = {
	loginState: RequestState.NULL,
	signupState: RequestState.NULL,
	role: UserRole.NULL,
	profile: {
		state: RequestState.NULL
	},
	profileEdit: {
		state: RequestState.NULL
	}
}

const reducer = (state, action) => {
	if (typeof state === 'undefined') state = initialState;
	switch (action.type) {
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				loginState: RequestState.COMPLETED,
				user: action.user,
				role: action.role,
				status: action.status
			}
		case USER_LOGIN_FETCHING:
			return {
				...state,
				loginState: RequestState.FETCHING,
				user: null,
				role: UserRole.NULL
			}
		case USER_LOGIN_ERROR:
			return {
				...state,
				loginState: RequestState.ERROR,
				user: null,
				role: UserRole.NULL
			}
		case RESET_USER_LOGIN: {
			return {
				...state,
				loginState: RequestState.NULL,
				user: null,
				role: UserRole.NULL
			}
		}
		case USER_SIGNUP_SUCCESS:
			return {
				...state,
				signupState: RequestState.COMPLETED,
				user: null,
				role: UserRole.NULL
			}
		case USER_SIGNUP_FETCHING:
			return {
				...state,
				signupState: RequestState.FETCHING,
				user: null,
				role: UserRole.NULL
			}
		case USER_SIGNUP_ERROR:
			return {
				...state,
				signupState: RequestState.ERROR,
				user: null,
				role: UserRole.NULL
			}
		case RESET_USER_SIGNUP: {
			return {
				...state,
				signupState: RequestState.NULL,
				user: null,
				role: UserRole.NULL
			}
		}
		case USER_LOGOUT:
			return initialState;
		case USER_PROFILE_FETCHING:
			return {
				...state,
				profile: {
					state: RequestState.FETCHING
				}
			}
		case USER_PROFILE_SUCCESS:
			return {
				...state,
				profile: {
					state: RequestState.COMPLETED,
					payload: action.payload
				}
			}
		case USER_PROFILE_ERROR:
			return {
				...state,
				profile: {
					state: RequestState.ERROR,
					errorMessage: action.errorMessage
				}
			}
		case USER_PROFILE_UPDATE_FETCHING:
			return {
				...state,
				profileEdit: {
					editState: RequestState.FETCHING
				}
			}
		case USER_PROFILE_UPDATE_SUCCESS:
			return {
				...state,
				profileEdit: {
					editState: RequestState.COMPLETED,
					payload: action.payload
				}
			}
		case USER_PROFILE_UPDATE_ERROR:
			return {
				...state,
				profileEdit: {
					editState: RequestState.ERROR,
					errorMessage: action.errorMessage
				}
			}
		default:
			return state;
	}
}
export {
	reducer as default,
	initialState as userInitialState
};
