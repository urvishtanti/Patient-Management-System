import React from 'react'
import styled from 'styled-components'
import { RequestState } from '../../lib/types'
import { LoadingComponent } from '../loading/loading'
import { VerticalSpace } from '../vertical-space/vertical-space'
import DashboardCardsComponent from './dashboard-cards-component'
import DashboardChartsComponent from './dashboard-chart-component'
import './manager-data-analytics.css'

const Container = styled.div`
    position: absolute;
    width: 80%;
    top: 0;
    left: 20%;
`

export default function ManagerDataAnalyticsComponent({
    reportParametersRequestState,
    reportParameters,
    reportParametersErrorMessage,
    reportDataRequestState,
    reportData,
    reportDataErrorMessage,
    onDateRangeChanged,
    chartCategory,
    onChangeChartCategory,
    inputValues,
    onChangeInputValues
}) {
    return (
        <Container>
            <div>
                <h3 className='dashboard-content'>
                    Dashboard
                </h3>
            </div>
            {
                reportParametersRequestState !== RequestState.COMPLETED ?
                    <LoadingComponent /> :
                    <DashboardCardsComponent payload={reportParameters}></DashboardCardsComponent>
            }
            {
                reportDataRequestState !== RequestState.COMPLETED ?
                    <LoadingComponent /> :
                    <DashboardChartsComponent
                        payload={reportData}
                        onChange={onDateRangeChanged}
                        chartCategory={chartCategory}
                        onChangeChartCategory={onChangeChartCategory}
                        inputValues={inputValues}
                        onChangeInputValues={onChangeInputValues}
                    />
            }
            <VerticalSpace height={10} />
        </Container>
    )
}