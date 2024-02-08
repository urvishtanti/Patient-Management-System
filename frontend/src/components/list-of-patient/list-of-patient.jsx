import classNames from "classnames";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CounselorMakeAppointment from "../../containers/counselor-make-appointment";
import DoctorMakeAppointment from "../../containers/doctor-make-appointment";
import { PathConstants } from "../../lib/path-constants";
import { UserRole } from "../../lib/types";
import { ErrorMessage } from "../elements/error-message";
import { RejectModal } from "../reject-modal/reject-modal";
import { PaginationComponent } from "../pagination/pagination";
import "./list-of-patient.css";
import { useCallback } from "react";
import { toReadableDateFormat } from "../../lib/time-util";

const Button = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 18px;
  border-radius: 0.8rem;
  color: rgba(0, 0, 0, 0.85);
  border: 1px solid #d9d9d9;
  background: #fff;

  &:focus,
  &:hover {
    color: #40a9ff;
    border-color: #40a9ff;
    background: #fff;
  }
  &,
  &:active,
  &:focus {
    outline: 0;
  }

  &.forward:hover {
    color: #008000;
    border-color: #008000;
    text-shadow: none;
  }

  &.dangerous {
    color: #ff4d4f;
    border-color: #ff4d4f;
    text-shadow: none;
  }
  &.dangerous {
    color: #ff4d4f;
    border-color: #ff4d4f;
    text-shadow: none;
  }
  &.dangerous:hover {
    text-decoration: none;
    background: #fff;
  }
`;

const Table = styled.table`
  padding: 10px;
  width: 100%;
  text-align: center;
  border-radius: 2px 2px 0 0;
  border-collapse: separate;
  border-spacing: 0;
  th {
    text-align: center;
  }
  tr > td {
    padding: 12px 8px;
  }
`;

export default function ListOfPatient({
  patientListPayload,
  role,
  onForwardToDoctor,
  appointmentErrorMessage,
  onRejectPatient,
  rejectPatientPayload,
}) {
  const [rejectModalVisibility, setRejectModalVisibility] = useState({
    isOpen: false,
  });

  function onOpenRejectModal(patientRecord) {
    setRejectModalVisibility({
      isOpen: true,
      ...patientRecord,
    });
  }

  function onCloseRejectModal() {
    setRejectModalVisibility({
      isOpen: false,
    });
  }

  const [appointmentVisibility, setAppointmentVisibility] = useState({
    isOpen: false,
  });
  const navigate = useNavigate();

  const onViewAssessment = (patientRecordId) => {
    const patientDetailsPagePath =
      role === UserRole.DOCTOR
        ? PathConstants.Internal_DoctorPatientDetails
        : PathConstants.Internal_CounselorPatientDetails;
    navigate(patientDetailsPagePath + patientRecordId);
  };

  const onOpenScheduler = (props) => {
    setAppointmentVisibility({
      isOpen: true,
      ...props,
    });
  };

  const onPageChange = (page) => {
    navigate({ pathname: PathConstants.CounselorLOP, search: `page=${page}` });
  };

  const onRejectAction = useCallback(
    (confirm, data) => {
      if (confirm && typeof onRejectPatient == "function") {
        onRejectPatient(data);
      }
    },
    [onRejectPatient]
  );

  const counselorcColumn = [
    {
      title: "Patient Name",
      key: "patientname",
      align: "center",
      getValue: (row, index) => {
        return row["patient"]
          ? row["patient"]["fullName"]
          : `Patient ${index + 1}`;
      },
    },
    {
      title: "Submission Date",
      key: "assessmentCreatedAt",
      getValue: (row, index) => {
        return `${toReadableDateFormat(row["assessmentCreatedAt"])}`;
      },
    },
    {
      title: "View Assessment Form",
      key: "",
      render: ({ data }) => (
        <Button
          title="View Assessment"
          className="view-assessment"
          onClick={(e) => {
            e.preventDefault();
            onViewAssessment(data.patientRecordId);
          }}
        >
          View Assessment
        </Button>
      ),
    },
    {
      title: "Schedule Appointment",
      key: "",
      render: ({ data }) => (
        <>
          <Button
            title="Schedule Appointment"
            onClick={() => onOpenScheduler(data)}
          >
            Schedule Appointment
          </Button>
        </>
      ),
    },
    {
      title: "Forward to a Doctor",
      key: "",
      render: ({ data }) => (
        <Button
          title="Forward to a Doctor"
          className={classNames("forward")}
          onClick={() => {
            onForwardToDoctor(data);
          }}
        >
          Forward to a Doctor
        </Button>
      ),
    },
    {
      title: "Reject Patient",
      key: "",
      render: ({ data }) => (
        <Button
          title="Reject"
          className={classNames("dangerous")}
          onClick={() => onOpenRejectModal(data)}
        >
          Reject
        </Button>
      ),
    },
  ];

  const doctorColumn = [
    {
      title: "Patient Name",
      key: "patientname",
      align: "center",
      getValue: (row, index) => {
        return row["patient"]
          ? row["patient"]["fullName"]
          : `Patient ${index + 1}`;
      },
    },
    {
      title: "Submission Date",
      key: "assessmentCreatedAt",
      align: "assessmentCreatedAt",
      getValue: (row, index) => {
        return `${toReadableDateFormat(row["assessmentCreatedAt"])}`;
      },
    },
    {
      title: "View Assessment Form",
      key: "",
      render: ({ data }) => (
        <Button
          title="View Assessment"
          className="view-assessment"
          onClick={(e) => {
            e.preventDefault();
            onViewAssessment(data.patientRecordId);
          }}
        >
          View Assessment
        </Button>
      ),
    },
    {
      title: "Schedule Appointment",
      key: "",
      render: ({ data }) => (
        <>
          <Button
            title="Schedule Appointment"
            onClick={() => {
              onOpenScheduler(data);
            }}
          >
            Schedule Appointment
          </Button>
        </>
      ),
    },
    {
      title: "Reject Patient",
      key: "",
      render: ({ data }) => (
        <Button
          title="Reject"
          className={classNames("dangerous")}
          onClick={() => onOpenRejectModal(data)}
        >
          Reject
        </Button>
      ),
    },
  ];

  const columnSchema =
    role === UserRole.DOCTOR ? doctorColumn : counselorcColumn;
  const MakeAppointment =
    role === UserRole.DOCTOR ? DoctorMakeAppointment : CounselorMakeAppointment;

  return (
    <>
      <h1 style={{ textAlign: "center", padding: 12, fontSize: 38 }}>
        List of Patients
      </h1>
      <Table size="middle">
        <thead>
          <tr>
            {columnSchema.map((columnS, index) => {
              return <th key={`${index}-${columnS.key}`}>{columnS.title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {patientListPayload.content.map((row, index) => {
            return (
              <tr key={`record-${index}`}>
                {columnSchema.map((columnS, index) => {
                  return (
                    <td key={`${index}-${columnS.key}`}>
                      {columnS.render ? (
                        <columnS.render data={row} />
                      ) : columnS.getValue ? (
                        <span>{columnS.getValue(row)}</span>
                      ) : (
                        <span>{row[columnS.key]}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <br></br>
      {appointmentErrorMessage && (
        <ErrorMessage>{appointmentErrorMessage}</ErrorMessage>
      )}
      <PaginationComponent
        onPageChange={onPageChange}
        pageNumber={patientListPayload.pageable.pageNumber}
        totalPages={patientListPayload.totalPages}
        first={patientListPayload.first}
        last={patientListPayload.last}
      />
      {rejectModalVisibility.isOpen && (
        <RejectModal
          isOpen={rejectModalVisibility}
          data={rejectModalVisibility}
          onClose={onCloseRejectModal}
          onAction={onRejectAction}
        />
      )}
      {appointmentVisibility.isOpen && (
        <MakeAppointment
          onUpdateVisibility={setAppointmentVisibility}
          {...appointmentVisibility}
        />
      )}
      {rejectPatientPayload && rejectPatientPayload.errorMessage && (
        <ErrorMessage>{rejectPatientPayload.errorMessage}</ErrorMessage>
      )}
      <div className="extra"></div>
    </>
  );
}
