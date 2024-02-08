import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditInfoComponent from '../components/edit-user-info/edit-info-component'
import InfoComponent from '../components/edit-user-info/info-component'
import FooterComponent from '../components/footer/footer'
import { LoadingComponent } from '../components/loading/loading'
import { VerticalSpace } from '../components/vertical-space/vertical-space'
import { toUTCDate } from '../lib/time-util'
import { RequestState } from '../lib/types'
import { fetchProfile, updateProfile } from '../store/actions/user'
import Header from './header'

const EditUserInfo = ({ role }) => {
    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfile(role));
    }, [dispatch, role]);

    const requestState = useSelector(state => state.user.profile.state);
    const editRequestState = useSelector(state => state.user.profileEdit.editState);
    const profile = useSelector(state => state.user.profile.payload);
    const profileUpdated = useSelector(state => state.user.profileEdit.payload);
    // const errorMessage = useSelector(state => state.user.profile.errorMessage);

    useEffect(() => {
        if (requestState === RequestState.COMPLETED) {
            const dateTokens = String(profile.dateOfBirth).split("T");
            if (dateTokens.length > 0) {
                setUser({
                    ...profile,
                    dateOfBirth: dateTokens[0]
                });
            }
        }
    }, [setUser, requestState, profile]);

    useEffect(() => {
        if (editRequestState === RequestState.COMPLETED) {
            const dateTokens = String(profileUpdated.dateOfBirth).split("T");
            if (dateTokens.length > 0) {
                setUser({
                    ...profileUpdated,
                    dateOfBirth: dateTokens[0]
                });
            }
        }
    }, [dispatch, setUser, editRequestState, profileUpdated]);

    const onFieldChange = (fieldName, value) => {
        console.log("fieldName", fieldName, value);
        setUser({
            ...user,
            [fieldName]: value
        })
    }

    const onSubmit = (event) => {
        console.log("onSubmit", user, toUTCDate(user.dateOfBirth));
        const updatedUser = {
            ...user,
            dateOfBirth: toUTCDate(user.dateOfBirth)
        }
        //handle submit
        dispatch(updateProfile(updatedUser, role));
    }

    const onPressBack = () => {
        setShowForm(false)
    }

    return (
        <>
            <Header />
            {
                requestState !== RequestState.COMPLETED ?
                    <LoadingComponent /> :
                    <div style={{ display: "flex", margin: "50px 150px" }}>
                        {user && Object.keys(user).length && !showForm && <InfoComponent role={role} data={user} toggleForm={() => setShowForm(true)} />}
                        {user && Object.keys(user).length && showForm && <EditInfoComponent
                            role={role}
                            user={user}
                            onFieldChange={onFieldChange}
                            onSubmit={onSubmit}
                            onPressBack={onPressBack}
                        />}
                    </div>
            }
            <VerticalSpace height={10} />
            <FooterComponent></FooterComponent>
        </>
    )
}

export default EditUserInfo