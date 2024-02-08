import React from 'react'
import { UserRole } from '../lib/types'
import PatientDetails from './patient-details'

export default function DoctorPatientDetails(props){
    return <PatientDetails role={UserRole.DOCTOR} />
}