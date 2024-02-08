import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { toReadableDateFormat } from "../../lib/time-util";
import { PatientRecordStatus } from "../../lib/types";
// import counselorImage from "./images/counselor.png";
// import doctorImage from "./images/doctor.png";
// import patientImage from "./images/patient.png";
import OneImage from "./images/1.jpg";
import TwoImage from "./images/2.jpg";
import ThreeImage from "./images/3.jpg";
import FourImage from "./images/4.jpg";
import FiveImage from "./images/5.jpg";

import "./patient-status.css";

function ImCross(props) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      version="1.1"
      viewBox="0 0 16 16"
      style={{
        color: props.color,
      }}
      height={"1em"}
      width={"1em"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z" />
    </svg>
  );
}

export const PatientStatus = ({ payload }) => {
  const STATUS_ACCEPT = {
    [PatientRecordStatus.NULL]: "Please take the assessment to get started!",
    [PatientRecordStatus.COUNSELOR_IN_PROGRESS]:
      "Your file is under review by the counselor.", // reject or accept
    [PatientRecordStatus.COUNSELOR_REJECTED]:
      "The counselor has rejected your file. Please fill out the form again if you want to restart the process.",
    [PatientRecordStatus.COUNSELOR_APPOINTMENT]:
      "Your appointment with the counselor has been scheduled on " +
      toReadableDateFormat(payload.startDateTime) +
      ".",
    [PatientRecordStatus.DOCTOR_IN_PROGRESS]:
      "Your file has been forwarded to a doctor for review.", // reject or appoinment
    [PatientRecordStatus.DOCTOR_REJECTED]:
      "The doctor has rejected your file. Please fill out the form again if you want to restart the process.",
    [PatientRecordStatus.DOCTOR_APPOINTMENT]:
      "Your appointment with the doctor has been scheduled on " +
      toReadableDateFormat(payload.startDateTime) +
      ".",
  };

  const steps = {
    [PatientRecordStatus.NULL]: 0,
    [PatientRecordStatus.COUNSELOR_IN_PROGRESS]: 25,
    [PatientRecordStatus.COUNSELOR_REJECTED]: 37.5,
    [PatientRecordStatus.COUNSELOR_APPOINTMENT]: 50,
    [PatientRecordStatus.DOCTOR_IN_PROGRESS]: 75,
    [PatientRecordStatus.DOCTOR_REJECTED]: 87.5,
    [PatientRecordStatus.DOCTOR_APPOINTMENT]: 100,
  };

  const rejected =
    payload.patientRecordStatus === PatientRecordStatus.COUNSELOR_REJECTED ||
    payload.patientRecordStatus === PatientRecordStatus.DOCTOR_REJECTED;
  const first_reject =
    payload.patientRecordStatus === PatientRecordStatus.COUNSELOR_REJECTED;
  const second_reject =
    payload.patientRecordStatus === PatientRecordStatus.DOCTOR_REJECTED;

  return (
    <div className="status-container">
      <h1 className="status-heading">Patient Status</h1>
      <div className="card-container">
        <div className="status-card">
          <img src={OneImage} alt="" />
        </div>
        <div className="status-card">
          <img src={TwoImage} alt="" />
        </div>
        <div className="status-card">
          <img src={ThreeImage} alt="" />
        </div>
        <div className="status-card">
          <img src={FourImage} alt="" />
        </div>
        <div className="status-card">
          <img src={FiveImage} alt="" />
        </div>
      </div>

      <ProgressBar
        percent={steps[payload.patientRecordStatus]}
        filledBackground={rejected ? "#dc3545" : "#198754"}
        height="20px"
        stepPositions={[0, 25, 37.5, 50, 75, 87.5, 100]}
      >
        <Step>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null} ${
                accomplished && rejected ? "failed" : null
              }`}
            >
              1
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null} ${
                accomplished && rejected ? "failed" : null
              }`}
            >
              2
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null} ${
                accomplished && rejected ? "failed" : null
              } ${first_reject ? "d-block" : "d-none"}`}
            >
              <ImCross />
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null} ${
                accomplished && rejected ? "failed" : null
              }`}
            >
              3
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null} ${
                accomplished && rejected ? "failed" : null
              }`}
            >
              4
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null} ${
                accomplished && rejected ? "failed" : null
              } ${second_reject ? "d-block" : "d-none"}`}
            >
              <ImCross />
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null} ${
                accomplished && rejected ? "failed" : null
              }`}
            >
              5
            </div>
          )}
        </Step>
      </ProgressBar>
      <div className="status-jumbotron-container">
        <div className="status-jumbotron">
          <h2>{STATUS_ACCEPT[payload.patientRecordStatus]}</h2>
        </div>
      </div>
      <div className="extra"></div>
    </div>
  );
};
