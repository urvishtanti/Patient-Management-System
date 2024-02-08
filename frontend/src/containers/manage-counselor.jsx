import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FooterComponent from "../components/footer/footer";
import { LoadingComponent } from "../components/loading/loading";
import { ManagerEditCounselor } from "../components/manager-edit-counselor/manager-edit-counselor";
import { ManagerSidebar } from "../components/manager-sidebar/manager-sidebar";
import { SideNavContainerComponent } from "../components/side-nav-container/side-nav-container";
import { RequestState } from "../lib/types";
import { fetchCounselors, removeCounselor } from "../store/actions/admin";

export default function ManageCounselor() {
  const dispatch = useDispatch();
  const location = useLocation();

  const requestState = useSelector(state => state.admin.counselor.requestState);

  const rejectRequestState = useSelector(state => state.admin.counselor.rejectRequestState);

  const rejectErrorMessage = useSelector(state => state.admin.counselor.rejectErrorMessage);

  const onLoad = useCallback(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    dispatch(fetchCounselors(page));
  }, [dispatch, location]);

  useEffect(() => {
    onLoad()
  }, [onLoad]);

  useEffect(() => {
    if (rejectRequestState === RequestState.COMPLETED) {
      onLoad();
    }
  }, [rejectRequestState, onLoad]);

  const payload = useSelector(state => state.admin.counselor.payload);

  const onRemove = (emailAddress) => {
    dispatch(removeCounselor(emailAddress));
  }

  return (
    <>
      <SideNavContainerComponent>
        <ManagerSidebar />
        {
          requestState !== RequestState.COMPLETED || !payload || !payload.content ?
            <LoadingComponent /> : <ManagerEditCounselor
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