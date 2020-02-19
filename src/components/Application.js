import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList.js";
import Appointment from "components/Appointment/index.js";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors.js"


// const appointments = [
//   {
//     id: 1,
//     time: "12pm"
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     student: "Clare Nolan",
//     interviewer: {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   },
//   {
//     id: 4,
//     time: "11am",
//     student: "James Cohen",
//     interviewer: {
//       id: 3,
//       name: "Mildred Nazir",
//       avatar: "https://i.imgur.com/T2WwVfS.png"
//     }
//   },
//   {
//     id: 5,
//     time: "2pm",
//     student: "Jane Doe",
//     interviewer: {
//       id: 4,
//       name: "Cohana Roy",
//       avatar: "https://i.imgur.com/FK8V841.jpg"
//     }
//   }
// ];



export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const schedule = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
    />
    )
  })
  const getDaysPromise = axios.get('/api/days');
  const getAppointmentsPromise = axios.get('/api/appointments');
  const getInterviewersPromse = axios.get('/api/interviewers')
  
  useEffect(() => {
    Promise.all([getDaysPromise, getAppointmentsPromise, getInterviewersPromse]).then((all) => {
      setState(prev => ({days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList days={state.days} day={state.day} setDay={setDay} />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
