import React, { useEffect, useReducer } from "react";
import axios from "axios";
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOTS = "SET_SPOTS";

function reducer(state, action) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

  switch (action.type) {
    case SET_SPOTS:
      const indexOfDay = state.days.findIndex(day => day.name === state.day);
      const newDays = [...state.days];
      newDays[indexOfDay].spots = newDays[indexOfDay].spots + action.addend;
      return { ...state, days: newDays };
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
        spots: action.spots
      };
    case SET_INTERVIEW: {
      console.log("set_int");
      return { ...state, appointments: action.value };
    }
    case SET_SPOTS: {
      console.log("before returning in switch statement", action.value);
      return { ...state, spots: action.value };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      dispatch({ type: SET_SPOTS, addend: -1 });
      dispatch({ type: SET_INTERVIEW, value: appointments });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      dispatch({ type: SET_SPOTS, addend: 1 });
      dispatch({ type: SET_INTERVIEW, value: appointments });
    });
  }

  useEffect(() => {
    const getDaysPromise = axios.get("/api/days");
    const getAppointmentsPromise = axios.get("/api/appointments");
    const getInterviewersPromise = axios.get("/api/interviewers");
    Promise.all([
      getDaysPromise,
      getAppointmentsPromise,
      getInterviewersPromise
    ]).then(all => {
      console.log("what is all", all);
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);
  return { state, setDay, bookInterview, cancelInterview };
}
