import React from "react";

export function getAppointmentsForDay(state, day) {
  const filterDays = state.days.filter(day => {
    return day.name === day;
  });
  if (filterDays.length === 0) {
    return [];
  }
  const appointmentsOfDay = filterDays[0].appointments.map(appt => {
    return state.appointments[appt];
  });
  return appointmentsOfDay;
}
