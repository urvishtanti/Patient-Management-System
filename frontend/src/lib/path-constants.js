import { UserRole } from "./types";

export const PathConstants = {
  Home: "/",

  /* Patient */
  PatientLogin: "/patient/login",
  PatientSignup: "/patient/signup",
  PatientHome: "/patient/home",
  AssessmentPage: "/patient/assessment",
  StatusPage: "/patient/status",
  PatientEditProfile: "/patient/edit",

  /* Counselor */
  CounselorLogin: "/counselor/login",
  CounselorSignup: "/counselor/signup",
  CounselorHome: "/counselor/home",
  CounselorLOP: "/counselor/patients",
  CounselorSchedule: "/counselor/view-schedule",
  CounselorToDoctor: "/counselor/doctors/:patientId",
  Internal_CounselorToDoctor: "/counselor/doctors/",
  CounselorPatientDetails: "/counselor/patient/:patientId",
  Internal_CounselorPatientDetails: "/counselor/patient/",
  CounselorEditProfile: "/counselor/edit",

  /* Doctor */
  DoctorLogin: "/doctor/login",
  DoctorSignup: "/doctor/signup",
  DoctorHome: "/doctor/home",
  DoctorLOP: "/doctor/patients",
  DoctorSchedule: "/doctor/view-schedule",
  DoctorPatientDetails: "/doctor/patient/:patientId",
  Internal_DoctorPatientDetails: "/doctor/patient/",
  DoctorEditProfile: "/doctor/edit",

  /* Social Media Links */
  Instagram: "../../https://www.instagram.com/",

  /* Manager */
  ManagerLogin: "/admin/login",
  ManagerDataAnalytics: "/admin/analytics",
  ManagePatient: "/admin/patient",
  ManageDoctor: "/admin/doctor",
  ManageCounselor: "/admin/counselor",
  ManagerCreate: "/admin/create",
  ManagerCreatePatient: `/admin/create/${UserRole.PATIENT}`,
  ManagerCreateCounselor: `/admin/create/${UserRole.COUNSELOR}`,
  ManagerCreateDoctor: `/admin/create/${UserRole.DOCTOR}`
};
