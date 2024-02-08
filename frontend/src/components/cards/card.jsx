import React from 'react'
import { UserRole } from '../../lib/types'
import CardContentComponent from './card-content'
import CardImageComponent from './card-image'
import CardOtherLoginComponent from './card-otheruser'
import { useSelector } from 'react-redux'

export default function CardComponent() {
    const userRole = useSelector(state => state.user.role);
    return (
        <>
            <CardImageComponent></CardImageComponent>
            <CardContentComponent></CardContentComponent>
            {userRole === UserRole.NULL && <CardOtherLoginComponent></CardOtherLoginComponent>}
        </>
    )
}