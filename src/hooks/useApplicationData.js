import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 5
  });
    
  function getDay() {
    //returns object for selected day (name, appointments, inteviews, spots)
    const thisDay = state.days && state.days.filter(day => day.name === state.day);
    return thisDay[0];
  }

  function countSpots(newAppointments, specificDay) {
    //returns number of spots remaining for selected day
    if (newAppointments && specificDay) { 
      let counter = 0;
      specificDay.appointments.forEach(elem => {
        if (newAppointments[elem].interview === null) counter ++;
      })
      return counter;
    }
  }

  //update appointments locally, then update api, and state
  function cancelInterview(id) {
    const target = state.appointments[id];
    const appointments = {
      ...state.appointments,
      [id]: {...target, interview: null }
    };
    const currDay = getDay();
    currDay.spots = countSpots(appointments, currDay);

    const newDays = {
      ...state.days, 
      ...currDay.spots
    }

    return axios({
      method: 'DELETE',
      url: `api/appointments/${id}`
    })
    .then(() => {
      setState(prev => ({...prev, appointments, newDays}))
    });
  }

  //update appointments locally, then update api, and state
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const currDay = getDay();
    currDay.spots = countSpots(appointments, currDay)

    const newDays = {
      ...state.days, 
      ...currDay.spots
    }
    return axios({
      method: 'PUT',
      url: `/api/appointments/${id}`,
      data: appointment
    })
    .then(() => {
      setState(prev => ({...prev, appointments, newDays}))
    });
  }

  const setDay = day => setState({ ...state, day });
  
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
        //get interviewer data from api
        axios.get('/api/interviewers')
          .then(res => res.data)
          .catch(error => error))
      ])
      .then(all => {
        setState(prev => ({ ...prev, days: all[0], appointments: all[1], interviewers: all[2]}));
      })      
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}