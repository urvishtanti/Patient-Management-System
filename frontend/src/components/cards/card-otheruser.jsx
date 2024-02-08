import React from 'react'
import './card-otheruser.css'
import { Link } from 'react-router-dom'
import LoginImage0 from './images/patient-login.jpg'
import LoginImage1 from './images/counselor-login.jpg'
import LoginImage2 from './images/doctors-login.jpg'
import { PathConstants } from '../../lib/path-constants'

export default function CardOtherLoginComponent() {
    return (<div className='card-login-container'>
        <h2>Access Account</h2>
        <div className='columns'>
            <div className='row image-container-login' style={{ paddingRight: "20px" }}>
                <img src={LoginImage0} className="doctor-image" alt='Mental Health' />
                <div className='middle'>
                    <div className='login-text'>
                        <Link to={PathConstants.PatientLogin} className='login-text'>Are you a Patient?</Link>
                    </div>
                </div>
            </div>
            <div className='row image-container-login' style={{ paddingRight: "20px" }}>
                <img src={LoginImage1} className="doctor-image" alt='Mental Health' />
                <div className='middle'>
                    <div className='login-text'>
                        <Link to={PathConstants.CounselorLogin} className='login-text'>Are you a Counselor?</Link>
                    </div>
                </div>
            </div>
            <div className='row image-container-login'>
                <img src={LoginImage2} className="doctor-image" alt='Mental Health' />
                <div className='middle'>
                    <div className='login-text'>
                        <Link to={PathConstants.DoctorLogin} className='login-text'>Are you a Doctor?</Link>
                    </div>
                </div>
            </div>
        </div >
    </div>
    )
}