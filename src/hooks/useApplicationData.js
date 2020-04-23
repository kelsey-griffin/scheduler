// import { useState, useEffect } from "react";
import { useEffect, useReducer } from "react";
import axios from 'axios';

//Reducer for state in app
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value }
    case SET_APPLICATION_DATA:
      return {...state, ...action.value}
    case SET_INTERVIEW: {
      return {...state, ...action.value}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }
  const [state, dispatch] = useReducer(reducer, initialState);
    
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

    return axios.delete(`api/appointments/${id}`)
    .then(() => {
      dispatch({type: SET_APPLICATION_DATA, value: {appointments, newDays} })
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

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({type: SET_APPLICATION_DATA, value: { appointments, newDays } })
    });
  }

  const setDay = day => dispatch({type: SET_DAY, value: day})
  // const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all(
      [//get days, appointment and interviewer data from api
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')
      ])
      .then(all => {
        const results = all.map(result => result.data)
        dispatch({type: SET_INTERVIEW, value: {days: results[0], appointments: results[1], interviewers: results[2]} })
      }).catch(error => console.error(error))      
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}