import React from 'react'
import { UserRole } from '../lib/types'
import PatientDetails from './patient-details'

export default function CounselorPatientDetails(props){
    return <PatientDetails role={UserRole.COUNSELOR} />
}