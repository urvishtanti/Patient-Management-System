import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PathConstants } from "../../lib/path-constants";
import { logout } from "../../store/actions/user";
import "./manager-sidebar.css";

export function ManagerSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("USER");
    dispatch(logout());
    navigate(PathConstants.ManagerLogin);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "20%",
          backgroundColor: "#f1f1f1",
          // height: "100%",
          minHeight: "100vh",
          margin: "0px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>
        <div className="sidebar-menu">
          <Link className="sidebar-links" to={PathConstants.ManagerDataAnalytics}>Report</Link>
          <Link className="sidebar-links" to={PathConstants.ManagePatient}>
            Manage Patient
          </Link>
          <Link className="sidebar-links" to={PathConstants.ManageDoctor}>
            Manage Doctor
          </Link>
          <Link className="sidebar-links" to={PathConstants.ManageCounselor}>
            Manage Counselor
          </Link>
          <button className="sidebar-links" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
