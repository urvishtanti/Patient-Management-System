const KeyMirror = require('keymirror');

export const LOGIN_SIGNUP_PANEL_TYPE = KeyMirror({
    LOGIN: null,
    SIGNUP: null
})

export const RequestState = KeyMirror({
    NULL: null,
    FETCHING: null,
    COMPLETED: null,
    ERROR: null
});

export const UserRole = KeyMirror({
    NULL: null,
    PATIENT: null,
    COUNSELOR: null,
    DOCTOR: null,
    MANAGER: null,
    ADMIN: null
});

export const UserRoleToRedux = {
    [UserRole.PATIENT]: "patient",
    [UserRole.COUNSELOR]: "counselor",
    [UserRole.DOCTOR]: "doctor",
    [UserRole.ADMIN]: "admin"
}

export const UserRoleToTitle = {
    [UserRole.PATIENT]: "Patient",
    [UserRole.COUNSELOR]: "Counselor",
    [UserRole.DOCTOR]: "Doctor",
}

export const ServerUserRoleToUserRole = {
    "ROLE_PATIENT": UserRole.PATIENT,
    "ROLE_COUNSELOR": UserRole.COUNSELOR,
    "ROLE_DOCTOR": UserRole.DOCTOR,
    "ROLE_ADMIN": UserRole.ADMIN
}

export const PatientRecordStatus = KeyMirror({
    NULL: "NULL",
    COUNSELOR_IN_PROGRESS: "COUNSELOR_IN_PROGRESS",
    COUNSELOR_APPOINTMENT: "COUNSELOR_APPOINTMENT",
    COUNSELOR_REJECTED: "COUNSELOR_REJECTED",
    DOCTOR_IN_PROGRESS: "DOCTOR_IN_PROGRESS",
    DOCTOR_REJECTED: "DOCTOR_REJECTED",
    DOCTOR_APPOINTMENT: "DOCTOR_APPOINTMENT"
})