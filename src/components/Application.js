import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

// //dummy data
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "3pm",
//   },
//   {
//     id: 4,
//     time: "7pm",
//     interview: {
//       student: "Mary Lou",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }, 
//   {
//     id: 5,
//     time: "4pm",
//   },
//   {
//     id: 6,
//     time: "8pm",
//     interview: {
//       student: "Nora Jean",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }, 
// ];


export default function Application(props) {
  // const [days, setDays] = useState([])
  // const [day, setDay] = useState("Monday")
  // const [appointments, setAppointments] = useState([])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));

  useEffect(() => {
    //get days data from api
    axios.get('/api/days')
      .then(res => {
        setDays(res.data)
      })
      .catch(error => error);
  }, [])

  useEffect(() => {
    //get days data from api
    axios.get('/api/appointments')
      .then(res => {
        console.log(res.data)
        const array = [];
        for (let obj in res.data) {
          array.push(res.data[obj])
        }
        setAppointments(array)
      })
      .catch(error => error);
  }, [])

  const listOfAppointments = state.appointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment}/>
    )
  })
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
