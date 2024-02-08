import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MakeAppointment } from "../components/make-appointment/make-appointment";
import { toUTCDateTime } from "../lib/time-util";
import { RequestState } from "../lib/types";
import {
  fetchAppointmentsForDate,
  makeAppointment
} from "../store/actions/doctor-appointments";

export default function DoctorMakeAppointment({
  patientRecordId,
  onUpdateVisibility,
  patient,
}) {
  const dispatch = useDispatch();

  const onSelectDate = (date) => {
    dispatch(fetchAppointmentsForDate(date));
  };

  useEffect(() => {
    dispatch(fetchAppointmentsForDate(toUTCDateTime(new Date())));
  }, [dispatch]);

  const requestState = useSelector((state) => state.doctorAppointments.appointment.state);

  const payload = useSelector((state) =>
    requestState === RequestState.COMPLETED
      ? state.doctorAppointments.appointment.payload
      : null
  );
  
  const onMakeAppointment = ({ startTime, endTime }) => {
    dispatch(
      makeAppointment(
        patientRecordId,
        toUTCDateTime(startTime),
        toUTCDateTime(endTime)
      )
    );
  };

  return (
    <MakeAppointment
      patient={patient}
      onUpdateVisibility={onUpdateVisibility}
      onSelectDate={onSelectDate}
      payload={payload}
      requestState={requestState}
      onMakeAppointment={onMakeAppointment}
    />
  );
}
