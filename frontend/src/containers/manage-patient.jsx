import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FooterComponent from "../components/footer/footer";
import { LoadingComponent } from "../components/loading/loading";
import { ManagerEditPatient } from "../components/manager-edit-patient/manager-edit-patient";
import { ManagerSidebar } from "../components/manager-sidebar/manager-sidebar";
import { SideNavContainerComponent } from "../components/side-nav-container/side-nav-container";
import { RequestState } from "../lib/types";
import { fetchPatients, removePatient } from "../store/actions/admin";

export default function ManagePatient() {
  const dispatch = useDispatch();
  const location = useLocation();

  const requestState = useSelector(state => state.admin.patient.requestState);

  const rejectRequestState = useSelector(state => state.admin.patient.rejectRequestState);

  const rejectErrorMessage = useSelector(state => state.admin.patient.rejectErrorMessage);

  const onLoad = useCallback(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    dispatch(fetchPatients(page));
  }, [dispatch, location]);

  useEffect(() => {
    onLoad()
  }, [onLoad]);

  useEffect(() => {
    if (rejectRequestState === RequestState.COMPLETED) {
      onLoad();
    }
  }, [rejectRequestState, onLoad]);

  const payload = useSelector(state => state.admin.patient.payload);

  const onRemove = (emailAddress) => {
    dispatch(removePatient(emailAddress));
  }

  return (
    <>
      <SideNavContainerComponent>
        <ManagerSidebar />
        {
          requestState !== RequestState.COMPLETED || !payload || !payload.content ?
            <LoadingComponent /> : <ManagerEditPatient
              payload={payload}
              onRemove={onRemove}
              rejectErrorMessage={rejectErrorMessage}
              rejectRequestState={rejectRequestState}
            />
        }
      </SideNavContainerComponent>
      <FooterComponent />
    </>
  );
}