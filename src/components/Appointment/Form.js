import React, { useState } from 'react';
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

export default function Form(props) {
  const [ name, setName ] = useState(props.name || "");
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null); 
  
  const handleNameInput = (evt) => {
    setName(evt.target.value)
  }
  const handleSetInterviewer = (evt) => {
    setInterviewer(evt)
  }
  const reset = () => {
    setName("")
    setInterviewer(null)
  }
  const cancel = () => {
    props.onCancel();
    reset();
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={handleNameInput}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
          onChange={handleSetInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={() => {
            if (name && interviewer) props.onSave(name, interviewer)
            }} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}