import React from 'react';
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
    const Days = props.days.map(day => {
      return (
        <DayListItem
          key={day.id}
          name={day.name}
          selected={day.name === props.day}
          spots={day.spots}
          setDay={props.setDay}
        />   
      )
    })
  return <ul>{Days}</ul>
}