import React from 'react';
import PropTypes from 'prop-types';

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem.js";


export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  }
  const Interviewers = props.interviewers.map(i => {
         return ( <InterviewerListItem
          key={i.id}
          name={i.name}
          avatar={i.avatar}
          selected={props.value === i.id}
          setInterviewer={(e) => props.onChange(i.id)}
          />)
  });
      
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {Interviewers}
      </ul>
    </section>
  )
};  