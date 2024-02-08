import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FooterComponent from "../components/footer/footer";
import ListOfPatient from "../components/list-of-patient/list-of-patient";
import { LoadingComponent } from "../components/loading/loading";
import { RequestState, UserRole } from "../lib/types";
import {
  fetchPatientList,
  onLoadDoctorPage,
  rejectPatient,
} from "../store/actions/doctor";
import Header from "./header";

export default function DoctorLOP(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const patientListState = useSelector(
    (state) => state.doctor.patientListState
  );

  const rejectPatientState = useSelector(
    (state) => state.doctor.rejectPatientRequestState
  );

  const rejectPatientErrorMessage = useSelector(
    (state) => state.doctor.rejectPatientErrorMessage
  );

  const onLoad = useCallback(() => {
    dispatch(onLoadDoctorPage());
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    dispatch(fetchPatientList(page));
  }, [dispatch, location]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  useEffect(() => {
    if (rejectPatientState === RequestState.COMPLETED) {
      onLoad();
    }
  }, [rejectPatientState, onLoad]);

  const patientListPayload = useSelector(
    (state) => state.doctor.patientListPayload
  );
  const appointmentState = useSelector((state) =>
    state.doctorAppointments.appointmentRequests
      ? state.doctorAppointments.appointmentRequests.state
      : RequestState.NULL
  );

  const appointmentErrorMessage = useSelector((state) =>
    appointmentState === RequestState.ERROR
      ? state.doctorAppointments.appointmentRequests.errorMessage
      : null
  );

  const onRejectPatient = (patientRecord) => {
    if (patientRecord && patientRecord.patientRecordId) {
      dispatch(rejectPatient(patientRecord.patientRecordId));
    }
  };

  return (
    <>
      <Header />
      {patientListState !== RequestState.COMPLETED ? (
        <LoadingComponent />
      ) : (
        <ListOfPatient
          role={UserRole.DOCTOR}
          patientListPayload={patientListPayload}
          appointmentState={appointmentState}
          appointmentErrorMessage={appointmentErrorMessage}
          onRejectPatient={onRejectPatient}
          rejectPatientPayload={{
            state: rejectPatientState,
            errorMessage: rejectPatientErrorMessage,
          }}
        />
      )}
      <FooterComponent />
    </>
  );
}
