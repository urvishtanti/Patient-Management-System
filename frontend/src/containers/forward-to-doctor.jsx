import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FooterComponent from "../components/footer/footer";
import { ListOfDoctor } from "../components/list-of-doctor/list-of-doctor";
import { LoadingComponent } from "../components/loading/loading";
import { PathConstants } from "../lib/path-constants";
import { RequestState } from "../lib/types";
import { assignDoctorToPatient, fetchDoctorList, fetchPatient } from "../store/actions/counselor-lod";
import Header from "./header";

export default function ForwardToDoctor() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { patientId } = useParams();

    const lodRequestState = useSelector(state => state.counselorLOD.state);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get("page");
        dispatch(fetchDoctorList(page));
    }, [dispatch, location]);

    const payload = useSelector(state => state.counselorLOD.payload);
    const activePatientState = useSelector(state => state.counselorLOD.activePatients[patientId] ? state.counselorLOD.activePatients[patientId].state : RequestState.NULL);
    const activePatient = useSelector(state => activePatientState === RequestState.COMPLETED ? state.counselorLOD.activePatients[patientId].activePatient : null);
    useEffect(() => {
        if (!activePatientState || activePatientState === RequestState.NULL) {
            dispatch(fetchPatient(patientId));
        }
    }, [navigate, dispatch, patientId, activePatientState]);


    const assignDoctorState = useSelector(state => state.counselorLOD.assignDoctorStates[patientId] ?
        state.counselorLOD.assignDoctorStates[patientId].state : RequestState.NULL);
        
    const assignDoctorErrorMessage = useSelector(state => state.counselorLOD.assignDoctorStates[patientId] ?
        state.counselorLOD.assignDoctorStates[patientId].errorMessage : null);
    useEffect(() => {
        if (assignDoctorState === RequestState.COMPLETED) {
            navigate(PathConstants.CounselorLOP);
        }
    }, [navigate, assignDoctorState]);


    const onSelect = (doctorRegistrationNumber) => {
        dispatch(assignDoctorToPatient(patientId, doctorRegistrationNumber));
    }

    return (
        lodRequestState !== RequestState.COMPLETED || activePatientState !== RequestState.COMPLETED ?
            <LoadingComponent /> :
            <>
                <Header />
                <ListOfDoctor
                    payload={payload}
                    activePatient={activePatient}
                    onSelect={onSelect}
                    errorMessage={assignDoctorErrorMessage}
                />
                <FooterComponent />
            </>
    )
}
