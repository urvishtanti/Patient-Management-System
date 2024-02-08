import React from 'react'
import { UserRole } from '../../lib/types'
import "./edit-styles.css"

const InfoComponent = (props) => {
    return (
        <div className='card'>
            <h2>Your Profile</h2>
            <hr /><br />
            <div className="name-row">
                <div>
                    <label>Full Name</label>
                    <input type='text' value={props.data.fullName} disabled />
                </div>
                <div>
                    <label>Email Address</label>
                    <input type='text' value={props.data.emailAddress} disabled />
                </div>
            </div>
            <div className="name-row">
                <div>
                    <label>Date of Birth</label>
                    <input type='text' value={props.data.dateOfBirth} disabled />
                </div>
                {
                    (props.role === UserRole.COUNSELOR || props.role === UserRole.DOCTOR) &&
                    <div>
                        <label>Registration Number</label>
                        <input type='text' value={props.data.registrationNumber} disabled />
                    </div>
                }
            </div>
            <label>Address</label>
            <input type='text' value={props.data.addressLine} disabled />
            <label>City</label>
            <input type='text' value={props.data.city} disabled />
            <label>Province</label>
            <input type='text' value={props.data.province} disabled />
            <label>Phone number</label>
            <input type='text' value={props.data.phoneNumber} disabled />
            <button className="edit-button" onClick={() => props.toggleForm()}>EDIT</button>
        </div>
    )
}

export default InfoComponent