import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FooterComponent from "../components/footer/footer";
import { LoadingComponent } from "../components/loading/loading";
import { ViewScheduleComponent } from "../components/view-schedule/view-schedule";
import { RequestState, UserRole } from "../lib/types";
import { fetchAppointments } from "../store/actions/doctor-appointments";
import Header from "./header";

export default function DoctorViewSchedule() {
  const dispatch = useDispatch();
  const location = useLocation();

  const requestState = useSelector((state) => state.doctorAppointments.state);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    dispatch(fetchAppointments(page));
  }, [dispatch, location]);

  const payload = useSelector((state) => state.doctorAppointments.payload);

  return (
    <>
      <Header></Header>
      {requestState !== RequestState.COMPLETED ? (
        <LoadingComponent />
      ) : (
        <ViewScheduleComponent payload={payload} role={UserRole.DOCTOR} />
      )}
      <FooterComponent></FooterComponent>
    </>
  );
}
