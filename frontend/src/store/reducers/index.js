import { combineReducers } from "redux"
import adminReducer, { adminInitialState } from "./admin"
import counselorReducer, { counselorInitialState } from "./counselor"
import counselorAppointmentsReducer, { counselorAppointmentsInitialState } from "./counselor-appointments"
import counselorDoctorListReducer, { counselorDoctorListInitialState } from "./counselor-lod"
import doctorReducer, { doctorInitialState } from "./doctor"
import doctorAppointmentsReducer, { doctorAppointmentsInitialState } from "./doctor-appointments"
import guiReducer, { guiInitialState } from "./gui"
import localesReducer, { localesInitialState } from "./locales"
import patientReducer, { patientInitialState } from "./patient"
import userReducer, { userInitialState } from "./user"

export const initialState = {
	locales: localesInitialState,
	user: userInitialState,

	/* Gui */
	gui: guiInitialState,

	/* Patient */
	patient: patientInitialState,

	/* Counselor */
	counselor: counselorInitialState,
	counselorAppointments: counselorAppointmentsInitialState,
	counselorLOD: counselorDoctorListInitialState,

	/* Doctor */
	doctor: doctorInitialState,
	doctorAppointments: doctorAppointmentsInitialState,

	/* Admin */
	admin: adminInitialState
}

export default combineReducers({
	locales: localesReducer,
	user: userReducer,

	/* Gui */
	gui: guiReducer,

	/* Patient */
	patient: patientReducer,

	/* Counselor */
	counselor: counselorReducer,
	counselorAppointments: counselorAppointmentsReducer,
	counselorLOD: counselorDoctorListReducer,

	/* Doctor */
	doctor: doctorReducer,
	doctorAppointments: doctorAppointmentsReducer,

	/* Admin */
	admin: adminReducer
})
