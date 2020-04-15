//returns an array of appointments when given a day
export default function getAppointmentsForDay(state, day) {
  const apptForDay = [];
  const dayObj = state.days.filter(i => i.name === day);
  if (dayObj.length) {
    dayObj[0].appointments.forEach(elem => {
      apptForDay.push(state.appointments[elem.toString()]);
    })
  }
  return apptForDay;
}
