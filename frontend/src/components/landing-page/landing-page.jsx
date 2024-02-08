import React from 'react'
import Header from '../../containers/header'
import CardComponent from '../cards/card'
import FooterComponent from '../footer/footer'
import { SubFooterComponent } from '../sub-footer/sub-footer'

export default function LandingPageComponent() {
    return (
        <>
            <Header />
            <CardComponent></CardComponent>
            <SubFooterComponent></SubFooterComponent>
            <FooterComponent></FooterComponent>
        </>
    )
}

