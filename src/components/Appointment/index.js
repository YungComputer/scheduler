import React, { Fragment } from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"


export default function Appointment(props){
  return <article className="appointment">
    <Header time={props.time} />
      (is props.interview ? Show(student, interviewer) : Empty())
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
  />
  </article>
}
