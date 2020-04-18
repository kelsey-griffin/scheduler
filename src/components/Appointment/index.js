import React from 'react';
import 'components/Appointment/styles.scss'

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(res => transition(SHOW))
    .catch(e => transition(ERROR_SAVE, true));
    
  }
  function deleteAppointment() {
    
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(res => transition(EMPTY))
    .catch(e => transition(ERROR_DELETE, true));

  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            id={props.id}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={props.interviewers}
            onCancel={() => back(EMPTY)}
            onSave={save}
          />
        )}
        {mode === SAVING && (
          <Status
            message="Saving..."
          />
        )}
        {mode === DELETING && (
          <Status
            message="Deleting..."
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            onConfirm={deleteAppointment}
            onCancel={() => back(SHOW)}
            message="Are you sure..."
          />
        )}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            onCancel={() => back(SHOW)}
            onSave={save}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message="Error: Save Aborted."
            // onClose={() => transition(CREATE, true)}
            onClose={() => back(CREATE)}
          />  
        )}
        {mode === ERROR_DELETE && (
          <Error
            message="Error: Delete Aborted."
            onClose={() => transition(SHOW, true)}
          />  
        )}
    </article>
  );
}
