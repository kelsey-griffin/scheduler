import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const listOfAppointments = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });

  useEffect(() => {
    //get days data from api
    Promise.all(
      [Promise.resolve(
        //get days data from api
        axios.get('/api/days')
          .then(res => res.data)
          .catch(error => error)),
        Promise.resolve(
          //get appointments data from api
          axios.get('/api/appointments')
            .then(res => res.data)
            .catch(error => error)),
        Promise.resolve(
          //get appointments data from api
          axios.get('/api/interviewers')
            .then(res => res.data)
            .catch(error => error))
      ])
      .then(all => {
        setState(prev => ({ ...prev, days: all[0], appointments: all[1], interviewers: all[2]}));
        console.log(all)
      })      
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>{listOfAppointments}</ul>
      </section>
    </main>
  );
};
