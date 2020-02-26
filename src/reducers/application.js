import react from "react";
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_SPOTS = "SET_SPOTS";
export function reducer(state, action) {
  switch (action.type) {
    case SET_SPOTS:
      const indexOfDay = state.days.findIndex(day => day.name === state.day);
      const newDays = [...state.days];
      newDays[indexOfDay].spots = newDays[indexOfDay].spots + action.addend;
      return { ...state, days: newDays };
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
        spots: action.spots
      };
    case SET_INTERVIEW: {
      console.log("set_int");
      return { ...state, appointments: action.value };
    }
    case SET_SPOTS: {
      console.log("before returning in switch statement", action.value);
      return { ...state, spots: action.value };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
