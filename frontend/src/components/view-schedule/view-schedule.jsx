import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PathConstants } from '../../lib/path-constants';
import { toReadableDateFormat } from '../../lib/time-util';
import { UserRole } from '../../lib/types';
import { PaginationComponent } from '../pagination/pagination';
import './view-schedule.css';

function searchFunctionCounselor() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("myScheduleTable");

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

export function ViewScheduleComponent({ payload, role }) {
    const navigate = useNavigate();

    const onPageChange = (page) => {
        navigate({
            pathname: role === UserRole.COUNSELOR ? PathConstants.CounselorLOP :
                PathConstants.DoctorLOP, search: `page=${page}`
        });
    }

    return (
        <>
            <h2 className='schedule-table-header' style={{ fontSize: '40px' }}>Appointment Schedule</h2>
            <div>
                <input type="search" id="mySearch" onKeyUp={() => searchFunctionCounselor()}
                    placeholder="🔍 Search for Date.." title="Type in a name" >
                </input>

                <table className='schedule' id='myScheduleTable'>
                    <tbody>
                        <tr>
                            <th>Patient Name</th>
                            <th>Date & Time</th>
                            <th>View Assessment</th>
                        </tr>
                        {
                            payload.content.map((record, recordIndex) => {
                                return <tr key={`counselor-appointment-${recordIndex}`}>
                                    <td>{record.patient.fullName}</td>
                                    <td>{`${toReadableDateFormat(record.startDateTime)}`}</td>
                                    <td><Link className='view-file-button' to={{
                                        pathname: (
                                            role === UserRole.COUNSELOR ? PathConstants.Internal_CounselorPatientDetails :
                                                PathConstants.Internal_DoctorPatientDetails
                                        ) + record.patientRecordId
                                    }}>View File</Link></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <br></br>
            <PaginationComponent
                onPageChange={onPageChange}
                pageNumber={payload.pageable.pageNumber}
                totalPages={payload.totalPages}
                first={payload.first}
                last={payload.last}
            />
            <div className='extra'>
            </div>
        </>
    )
}