import React from "react";

export function getAppointmentsForDay(state, day) {
  const resultArray = [];
  for (const selectedDay in state.days) {
    if (state.days[selectedDay].name === day) {
      for (const appointment in state.days[selectedDay].appointments) {
        resultArray.push(
          state.appointments[state.days[selectedDay].appointments[appointment]]
        );
      }
      return resultArray;
    }
  }
  return resultArray;
}

export function getInterviewersForDay(state, day) {
  const resultArray = [];
  for (const selectedDay in state.days) {
    if (state.days[selectedDay].name === day) {
      for (const interviewer of state.days[selectedDay].interviewers) {
        resultArray.push(state.interviewers[interviewer]);
      }
      return resultArray;
    }
  }
  return resultArray;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const newInterview = {
    ...interview,
    interviewer: { ...state.interviewers[interview.interviewer] }
  };
  return newInterview;
}
