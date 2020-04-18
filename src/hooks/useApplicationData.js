import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(/*???*/) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 5
  });
  
  console.log("days: ", state.days)
  
  function countSpots() {
    const copy = {...state};
    console.log("copy --> ", copy)

    const specificDay = copy.days.filter(day => day.name === copy.day)
    console.log("spec day: ", specificDay)

    const dayID = specificDay[0] && specificDay[0].id
    console.log("day id ", dayID)

    if (copy.appointments && specificDay[0]) { 
      console.log("specific day: ", specificDay[0].appointments)
      
      let counter = 0;
      specificDay[0].appointments.forEach(elem => {
        console.log("elem --> ", copy.appointments[elem].interview)
        if (copy.appointments[elem].interview === null) counter ++;
      })
      console.log(counter);
      const target = state.days[dayID - 1]
      const days = {
        ...state.days, [dayID - 1]: {...target, spots: counter}
      }
      setState({...state, days})
    }
  }
  countSpots();
  // const setSpots = spots => setState({ ...state, spots });
  // setSpots(countSpots());

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