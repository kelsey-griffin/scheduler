import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const formatSpots = (num) => {
    switch (num) {
      case 0: 
        return "no spots";
      case 1: return "1 spot";
      default: return `${num} spots`;
    }
  };
  const dayClass = classNames("day-list__item", {"day-list__item--selected": props.selected}, {"day-list__item--full": props.spots === 0})
  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{`${formatSpots(props.spots)} remaining`}</h3>
    </li>
  );
};