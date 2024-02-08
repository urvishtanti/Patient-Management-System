import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FooterComponent from "../components/footer/footer";
import { LoadingComponent } from "../components/loading/loading";
import { PatientStatus } from "../components/patient-status/patient-status";
import { RequestState } from "../lib/types";
import {
  fetchPatientRecordStatus,
  onLoadPatientStatusPage,
} from "../store/actions/patient";
import Header from "./header";

export default function StatusPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onLoadPatientStatusPage());
  }, [dispatch]);

  const patientRecordStatusState = useSelector(
    (state) => state.patient.patientRecordStatusState
  );

  useEffect(() => {
    if (patientRecordStatusState === RequestState.NULL) {
      dispatch(fetchPatientRecordStatus());
    }
  }, [dispatch, patientRecordStatusState]);

  const payload = useSelector(
    (state) => state.patient.patientRecordStatusPayload
  );

  return (
    <>
      <Header />
      {patientRecordStatusState !== RequestState.COMPLETED ? (
        <LoadingComponent />
      ) : (
        <PatientStatus payload={payload} />
      )}
      <FooterComponent></FooterComponent>
    </>
  );
}
