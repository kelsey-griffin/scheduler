import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(/*???*/) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function cancelInterview(id) {
    const target = state.appointments[id]
    const appointments = {
      ...state.appointments,
      [id]: {...target, interview: null }
    };
    return axios({
      method: 'DELETE',
      url: `api/appointments/${id}`
    })
    .then(result => {
      setState({...state, appointments})
      console.log(result)
    });
  }

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios({
      method: 'PUT',
      url: `/api/appointments/${id}`,
      data: appointment
    })
    .then(result => {
      setState({...state, appointments})
      console.log(result)
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
          //get appointments data from api
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