import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected})
  // const interviewerImageClass = classNames("interviewers__item-image", {"interviewers__item--selected": props.selected})
  
  return (
    <li 
      className={interviewerClass}
      selected={props.selected}
      onClick={props.setInterviewer}
      >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};