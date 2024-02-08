import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FooterComponent from "../components/footer/footer";
import { LoadingComponent } from "../components/loading/loading";
import { ManagerEditDoctor } from "../components/manager-edit-doctor/manager-edit-doctor";
import { ManagerSidebar } from "../components/manager-sidebar/manager-sidebar";
import { SideNavContainerComponent } from "../components/side-nav-container/side-nav-container";
import { RequestState } from "../lib/types";
import { fetchDoctors, removeDoctor } from "../store/actions/admin";

export default function ManageDoctor() {
  const dispatch = useDispatch();
  const location = useLocation();

  const requestState = useSelector(state => state.admin.doctor.requestState);

  const rejectRequestState = useSelector(state => state.admin.doctor.rejectRequestState);

  const rejectErrorMessage = useSelector(state => state.admin.doctor.rejectErrorMessage);

  const onLoad = useCallback(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    dispatch(fetchDoctors(page));
  }, [dispatch, location]);

  useEffect(() => {
    onLoad()
  }, [onLoad]);

  useEffect(() => {
    if (rejectRequestState === RequestState.COMPLETED) {
      onLoad();
    }
  }, [rejectRequestState, onLoad]);

  const payload = useSelector(state => state.admin.doctor.payload);

  const onRemove = (emailAddress) => {
    dispatch(removeDoctor(emailAddress));
  }

  return (
    <>
      <SideNavContainerComponent>
        <ManagerSidebar />
        {
          requestState !== RequestState.COMPLETED || !payload || !payload.content ?
            <LoadingComponent /> : <ManagerEditDoctor
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