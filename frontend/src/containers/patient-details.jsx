import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FooterComponent from "../components/footer/footer";
import { LoadingComponent } from "../components/loading/loading";
import PatientInfo from "../components/patient-info/patient-info";
import ViewAssessment from "../components/view-assessment";
import { RequestState, UserRole, UserRoleToRedux } from "../lib/types";
import { fetchPatient as fatchPatientForCounselor } from "../store/actions/counselor";
import { fetchPatient as fatchPatientForDoctor } from "../store/actions/doctor";
import Header from "./header";

export default function PatientDetails({ role }) {
  const { patientId } = useParams();
  const activePatientState = useSelector(
    (state) => state[UserRoleToRedux[role]].activePatientState
  );
  const activePatients = useSelector(
    (state) => state[UserRoleToRedux[role]].activePatients
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !activePatients[patientId] ||
      activePatients[patientId].state === RequestState.NULL
    ) {
      if (role === UserRole.COUNSELOR) {
        dispatch(fatchPatientForCounselor(patientId));
      } else if (role === UserRole.DOCTOR) {
        dispatch(fatchPatientForDoctor(patientId));
      }
    }
  }, [dispatch, activePatientState, patientId, activePatients, role]);

  return (
    <>
      <Header />
      {activePatients[patientId] ? (
        <>
          {activePatients[patientId].state === RequestState.COMPLETED && (
            <>
              <PatientInfo
                patient={activePatients[patientId].patient}
                createdAt={activePatients[patientId].createdAt}
              />
              <ViewAssessment
                assessmentResult={activePatients[patientId].assessmentResult}
              />
            </>
          )}
          {activePatients[patientId].state === RequestState.FETCHING && (
            <LoadingComponent />
          )}
        </>
      ) : (
        <LoadingComponent />
      )}
      <FooterComponent />
    </>
  );
}
