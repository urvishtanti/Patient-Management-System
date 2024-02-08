import React from "react";
import { toReadableDateFormat } from "../../lib/time-util";
import "./patient-info.css";

export default function PatientInfo({ patient, createdAt }) {
  return (
    <div className="patient-info-container">
      <div className="table-header">Patient Information</div>
      <table className="pi-table">
        <thead>
          <tr className="pi-row">
            <th className="pi-header">Patient Name:</th>
            <td className="pi-description">{patient.fullName}</td>
          </tr>
        </thead>
        <tbody>
          <tr className="pi-row">
            <th className="pi-header">Patient Age:</th>
            <td className="pi-description">{patient.age}</td>
          </tr>
          <tr className="pi-row">
            <th className="pi-header">Assessment Date:</th>
            <td className="pi-description">{`${toReadableDateFormat(
              createdAt
            )}`}</td>
          </tr>
          {patient.addressLine && (
            <tr className="pi-row">
              <th className="pi-header">Address:</th>
              <td className="pi-description">{patient.addressLine}</td>
            </tr>
          )}
          {patient.phoneNumber && (
            <tr className="pi-row">
              <th className="pi-header">Phone Number:</th>
              <td className="pi-description">{patient.phoneNumber}</td>
            </tr>
          )}
          <tr className="pi-row">
            <th className="pi-header">Email ID:</th>
            <td className="pi-description">{patient.emailAddress}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
