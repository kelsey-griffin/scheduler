//returns an array of appointments when given a day
export const getAppointmentsForDay = (state, day) => {
  const apptForDay = [];
  const dayObj = state.days.filter(i => i.name === day);
  if (dayObj.length) {
    dayObj[0].appointments.forEach(elem => {
      apptForDay.push(state.appointments[elem.toString()]);
    })
  }
  return apptForDay;
};

export const getInterview = (state, interview) => {
  //reformat the interview data, if any, to show interviewer details
  if (interview) {
    const fullInterviewer = state.interviewers[interview.interviewer];
    const newInterview = {...interview, interviewer: fullInterviewer};
    return newInterview;
  }
  return null;
};

export const getInterviewersForDay = (state, day) => {
  const interviewersForDay = [];
  const dayObj = state.days.filter(i => i.name === day);
  if (dayObj.length) {
    dayObj[0].interviewers.forEach(elem => {
      interviewersForDay.push(state.interviewers[elem.toString()]);
    })
  }
  return interviewersForDay;
};