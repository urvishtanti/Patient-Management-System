import React, { useEffect, useState } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { fromUTCDate, toUTCDate } from "../../lib/time-util";
import { RequestState } from "../../lib/types";
import "./make-appointment.css";

const getDefaultAvailableTimeslots = () => {
  const defaultTimeslots = [];
  [0, 1, 2, 3, 4, 5].forEach((id) => {
    for (let startHour = 9; startHour < 17; startHour++) {
      defaultTimeslots.push({
        id,
        startTime: new Date(
          new Date(new Date().setDate(new Date().getDate() + id)).setHours(
            startHour,
            0,
            0,
            0
          )
        ),
        endTime: new Date(
          new Date(new Date().setDate(new Date().getDate() + id)).setHours(
            startHour,
            30,
            0,
            0
          )
        ),
      });
      defaultTimeslots.push({
        id,
        startTime: new Date(
          new Date(new Date().setDate(new Date().getDate() + id)).setHours(
            startHour,
            30,
            0,
            0
          )
        ),
        endTime: new Date(
          new Date(new Date().setDate(new Date().getDate() + id)).setHours(
            startHour + 1,
            0,
            0,
            0
          )
        ),
      });
    }
  });
  return defaultTimeslots;
};
export function MakeAppointment({
  patient,
  onUpdateVisibility,
  onSelectDate,
  payload,
  requestState,
  onMakeAppointment,
  errorMessage,
}) {
  let [availableTimeslots, setAvailableTimeslots] = useState([]);

  useEffect(() => {
    if (requestState === RequestState.COMPLETED && payload) {
      let defaultTimeslots = getDefaultAvailableTimeslots();
      payload.forEach((reservedTimeslot) => {
        const startTimeslot = fromUTCDate(reservedTimeslot.startDateTime);
        const endTimeslot = fromUTCDate(reservedTimeslot.endDateTime);
        defaultTimeslots = defaultTimeslots.filter((availableTimeslot) => {
          // if the availableTimeslot#startTime or availableTimeslot#endTime is between reserverTimeslot, we need to skip this timeslot.
          return !(
            (availableTimeslot.startTime.getTime() >= startTimeslot.getTime() &&
              availableTimeslot.startTime.getTime() < endTimeslot.getTime()) ||
            (availableTimeslot.endTime.getTime() > startTimeslot.getTime() &&
              availableTimeslot.endTime.getTime() < endTimeslot.getTime())
          );
        });
      });

      setAvailableTimeslots(defaultTimeslots);
    }
  }, [setAvailableTimeslots, requestState, payload]);

  return (
    <div className="modal-appointment">
      <div className="modal-content">
        <div className="modal-heading">
          <div className="patient-id">
            Schedule appointment for {patient.fullName}
          </div>
          <div className="close" onClick={() => onUpdateVisibility(false)}>
            &times;
          </div>
        </div>
        <ScheduleMeeting
          // ... other props
          availableTimeslots={availableTimeslots}
          onSelectedDayChange={(date) => {
            onSelectDate(toUTCDate(date));
          }}
          // Language props
          onStartTimeSelect={({ availableTimeslot }) => {
            onUpdateVisibility(false);
            onMakeAppointment(availableTimeslot);
          }}
          lang_cancelButtonText="Cancel"
          lang_confirmButtonText="Confirm"
          lang_emptyListText="No slots available for today"
          lang_goToNextAvailableDayText="Next Available"
          lang_noFutureTimesText="No future times available"
          // Date format props
          format_nextFutureStartTimeAvailableFormatString="cccc, LLLL do"
          format_selectedDateDayTitleFormatString="cccc, LLLL do"
          format_selectedDateMonthTitleFormatString="LLLL yyyy"
          format_startTimeFormatString="h:mm a"
        />
      </div>
    </div>
  );
}
