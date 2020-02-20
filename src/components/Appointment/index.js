import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "hooks/useVisualMode.js";
import Status from "./Status.js"
import Confirm from "components/Appointment/Confirm.js"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }
  function cancelAppt(id) {
    transition(CONFIRM)
  }
  function deleteAppt() {
    transition(DELETING);
    props.cancelInterview(props.id).then(transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancelAppt}
          onConfirm={props.onConfirm}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode == DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to cancel?" onCancel={back} onConfirm={deleteAppt} />}
    </article>
  );
}
