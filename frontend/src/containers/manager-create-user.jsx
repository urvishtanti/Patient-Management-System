import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateUserComponent } from "../components/create-user-component/create-user-component";
import FooterComponent from "../components/footer/footer";
import { ManagerSidebar } from "../components/manager-sidebar/manager-sidebar";
import { SideNavContainerComponent } from "../components/side-nav-container/side-nav-container";
import { toUTCDate } from "../lib/time-util";
import { RequestState } from "../lib/types";
import { createUser } from "../store/actions/admin";

const initialUserState = {
  registrationNumber: "",
  fullName: "",
  emailAddress: "",
  addressLine: "",
  city: "",
  province: "",
  country: "",
  dateOfBirth: "",
  phoneNumber: ""
}

export default function ManagerCreateUser({ role }) {
  const [user, setUser] = useState({
    ...initialUserState
  });

  const onFieldChange = (fieldName, value) => {
    setUser({
      ...user,
      [fieldName]: value,
    });
  };

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    dispatch(createUser({
      ...user,
      dateOfBirth: toUTCDate(user.dateOfBirth)
    }, role));
  };

  const requestState = useSelector((state) => state.admin.createRequest.state);
  const errorMessage = useSelector((state) => state.admin.createRequest.errorMessage);

  useEffect(() => {
    if (requestState === RequestState.COMPLETED) {
      setUser({
        ...initialUserState
      })
    }
  }, [requestState, setUser]);

  return (
    <>
      <SideNavContainerComponent>
        <ManagerSidebar />
        <CreateUserComponent
          user={user}
          onFieldChange={onFieldChange}
          onSubmit={onSubmit}
          userRole={role}
          requestState={requestState}
          errorMessage={errorMessage}
        />
      </SideNavContainerComponent>
      <FooterComponent />
    </>
  );
}
