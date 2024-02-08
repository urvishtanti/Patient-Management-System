import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FooterComponent from '../components/footer/footer';
import ManagerDataAnalyticsComponent from '../components/manager-data-analytics/manager-data-analytics';
import { ManagerSidebar } from '../components/manager-sidebar/manager-sidebar';
import { SideNavContainerComponent } from '../components/side-nav-container/side-nav-container';
import { toEndHourDate, toRangeFromDay, toRangeFromMonth, toRangeFromWeek, toStartHourDate, toUTCDateInDate } from '../lib/time-util';
import { fetchReport, fetchReportParameters } from '../store/actions/admin';


var currentDate = toUTCDateInDate(new Date());
var startDate = toUTCDateInDate(new Date(currentDate.getFullYear(), 0, 1));
var days = Math.floor((currentDate - startDate) /
    (24 * 60 * 60 * 1000));
export default function ManagerDataAnalytics(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchReportParameters());
        // get today's report
        dispatch(fetchReport(toStartHourDate(new Date()), toEndHourDate(new Date())));
    }, [dispatch]);

    const reportParametersRequestState = useSelector(state => state.admin.reportParameters.state);
    const reportParameters = useSelector(state => state.admin.reportParameters.payload);
    const reportParametersErrorMessage = useSelector(state => state.admin.reportParameters.errorMessage);

    const reportDataRequestState = useSelector(state => state.admin.reportData.state);
    const reportData = useSelector(state => state.admin.reportData.payload);
    const reportDataErrorMessage = useSelector(state => state.admin.reportData.errorMessage);

    const onDateRangeChanged = (startDateTime, endDateTime) => {
        dispatch(fetchReport(startDateTime, endDateTime));
    }

    const [inputValues, setInputValues] = useState({
        0: `${new Date().toISOString().slice(0, 10)}`,
        1: `${toUTCDateInDate(new Date()).getFullYear()}-W${Math.ceil(days / 7)}`,
        2: `${toUTCDateInDate(new Date()).getFullYear()}-${(toUTCDateInDate(new Date()).getMonth()) + 1}`,
    });

    const onChangeInputValues = (key, value) => {
        setInputValues({
            ...inputValues,
            [key]: value
        })
    }

    const [chartCategory, setChartCategory] = useState(0);

    const onChangeChartCategory = (chartCategory) => {
        setChartCategory(chartCategory);
        let rangeConverter;
        if (chartCategory === 0) {
            rangeConverter = toRangeFromDay;
        } else if (chartCategory === 1) {
            rangeConverter = toRangeFromWeek;
        } else if (chartCategory === 2) {
            rangeConverter = toRangeFromMonth;
        }
        if (typeof rangeConverter === 'function') {
            const [startDate, endDate] = rangeConverter(inputValues[chartCategory]);
            onDateRangeChanged(startDate, endDate);
        }
    }

    return (
        <>
            <SideNavContainerComponent>
                <ManagerSidebar />
                <ManagerDataAnalyticsComponent
                    reportParametersRequestState={reportParametersRequestState}
                    reportDataRequestState={reportDataRequestState}
                    reportParameters={reportParameters}
                    reportParametersErrorMessage={reportParametersErrorMessage}
                    reportData={reportData}
                    reportDataErrorMessage={reportDataErrorMessage}
                    onDateRangeChanged={onDateRangeChanged}
                    chartCategory={chartCategory}
                    onChangeChartCategory={onChangeChartCategory}
                    inputValues={inputValues}
                    onChangeInputValues={onChangeInputValues}
                />
            </SideNavContainerComponent>
            <FooterComponent />
        </>
    )
}

