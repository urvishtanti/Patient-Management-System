import { faPersonChalkboard, faUser, faUserDoctor, faUserNurse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './dashboard-cards.css'


export default function DashboardCardsComponent({ payload }) {
    return (
        <div className='dashboard-card-row'>
            <div className='dashboard-card-columns'>
                <div className='dashboard-card-cards cards-color-users tooltip'>
                    <FontAwesomeIcon icon={faUser} className='users-cards'></FontAwesomeIcon>
                    <h3 style={{ fontSize: "1.7rem" }}>Total Patients</h3>
                    <p className='show-data-cards'>{payload.numTotal}</p>
                    <span className="tooltiptext">Total patients registered to the system.</span>
                </div>
            </div>

            <div className='dashboard-card-columns'>
                <div className='dashboard-card-cards cards-color-assessments tooltip'>
                    <FontAwesomeIcon icon={faPersonChalkboard} className='users-cards'></FontAwesomeIcon>
                    <h3 style={{ fontSize: "1.7rem" }}>Assessments</h3>
                    <p className='show-data-cards'>{payload.numAttemptedAssessment}</p>
                    <span className="tooltiptext">Waiting for counselor to process the file.</span>
                </div>
            </div>

            <div className='dashboard-card-columns'>
                <div className='dashboard-card-cards cards-color-meeting-counselor tooltip'>
                    <FontAwesomeIcon icon={faUserNurse} className='users-cards'></FontAwesomeIcon>
                    <h3 style={{ fontSize: "1.7rem" }}>Meeting Counselor</h3>
                    <p className='show-data-cards'>{payload.numHasCounselorAppointment}</p>
                    <span className="tooltiptext">Has appointment with counselor</span>
                </div>
            </div>

            <div className='dashboard-card-columns'>
                <div className='dashboard-card-cards cards-color-meeting-doctor tooltip'>
                    <FontAwesomeIcon icon={faUserDoctor} className='users-cards'></FontAwesomeIcon>
                    <h3 style={{ fontSize: "1.7rem" }}>Meeting Doctor</h3>
                    <p className='show-data-cards'>{payload.numHasDoctorAppointment}<span>({payload.numInProcessingDoctorAppointment})</span></p>
                    <span className="tooltiptext">X (Y)<br />X = Has appointment with doctor<br /> Y = Waiting for doctor to process the file</span>
                </div>
            </div>
        </div>
    )
}