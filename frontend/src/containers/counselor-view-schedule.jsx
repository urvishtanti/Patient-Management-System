import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FooterComponent from "../components/footer/footer";
import { LoadingComponent } from "../components/loading/loading";
import { ViewScheduleComponent } from "../components/view-schedule/view-schedule";
import { RequestState, UserRole } from "../lib/types";
import { fetchAppointments } from "../store/actions/counselor-appointments";
import Header from "./header";

export default function CounselorViewSchedule() {
  const dispatch = useDispatch();
  const location = useLocation();

  const requestState = useSelector(
    (state) => state.counselorAppointments.state
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    dispatch(fetchAppointments(page));
  }, [dispatch, location]);

  const payload = useSelector((state) => state.counselorAppointments.payload);

  return (
    <>
      <Header></Header>
      {requestState !== RequestState.COMPLETED ? (
        <LoadingComponent />
      ) : (
        <ViewScheduleComponent payload={payload} role={UserRole.COUNSELOR} />
      )}
      <FooterComponent></FooterComponent>
    </>
  );
}
