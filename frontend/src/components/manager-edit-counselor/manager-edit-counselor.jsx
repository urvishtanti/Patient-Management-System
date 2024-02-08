import classNames from "classnames";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PathConstants } from "../../lib/path-constants";
import { UserRole } from "../../lib/types";
import { RejectModal } from "../reject-modal/reject-modal";
import { PaginationComponent } from "../pagination/pagination";
import { VerticalSpace } from "../vertical-space/vertical-space";
import "./manager-edit-counselor.css";
import { toReadableDateFormat, toUTCDateTime } from "../../lib/time-util";
import { useCallback } from "react";

function searchByEmail() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myManagerSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("myCounselorList");

  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

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

  &.forward {
    color: #008000;
    border-color: #008000;
    text-shadow: none;
  }

  &.forward:hover {
    color: #fff;
    background-color: #008000;
  }

  &.dangerous {
    color: #ff4d4f;
    border-color: #ff4d4f;
    text-shadow: none;
  }

  &.dangerous:hover {
    text-decoration: none;
    background: #ff4d4f;
    color: #fff;
  }
`;

export function ManagerEditCounselor({
  payload,
  onRemove,
  rejectRequestState,
  rejectErrorMessage,
}) {
  const navigate = useNavigate();
  const onPageChange = (page) => {
    navigate({
      pathname: PathConstants.ManageCounselor,
      search: `page=${page}`,
    });
  };
  const onRejectAction = useCallback(
    (confirm, data) => {
      if (confirm && typeof onRemove == "function") {
        onRemove(data.emailAddress);
      }
    },
    [onRemove]
  );

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

  return (
    <>
      <div className="manager-edit-counselor-container">
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <h2 className="manager-counselor-table-header">Counselor List</h2>
          <div className="manager-add-counselor-button">
            <Button
              title="Add Counselor"
              className={classNames("forward")}
              onClick={() =>
                navigate(`${PathConstants.ManagerCreate}/${UserRole.COUNSELOR}`)
              }
            >
              Add Counselor
            </Button>
          </div>
        </div>
        <div>
          <input
            type="search"
            id="myManagerSearch"
            onKeyUp={() => searchByEmail()}
            placeholder="🔍 Search for counselor by Email.."
            title="Type in an Email"
          ></input>

          <table className="manager-counselor-list" id="myCounselorList">
            <tbody>
              <tr>
                <th>Counselor Name</th>
                <th>Counselor Email ID</th>
                <th>Profile Created On</th>
                <th>Remove Counselor</th>
              </tr>
              {payload.content.map((record) => (
                <tr key={`${record.emailAddress}`}>
                  <td>{record.fullName}</td>
                  <td>{record.emailAddress}</td>
                  <td>
                    {toReadableDateFormat(toUTCDateTime(record.createdAt))}
                  </td>
                  <td>
                    <Button
                      title="Remove"
                      className={classNames("dangerous")}
                      onClick={() => onOpenRejectModal(record)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
          <PaginationComponent
            onPageChange={onPageChange}
            pageNumber={payload.pageable.pageNumber}
            totalPages={payload.totalPages}
            first={payload.first}
            last={payload.last}
          />
          {rejectModalVisibility.isOpen && (
            <RejectModal
              isOpen={rejectModalVisibility}
              data={rejectModalVisibility}
              onClose={onCloseRejectModal}
              onAction={onRejectAction}
            />
          )}
          <VerticalSpace height={4} />
        </div>
      </div>
    </>
  );
}
