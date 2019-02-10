import { LOGIN } from "../actiontypes";

const initialState = {
  loggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true
      };

    default:
      return state;
  }
}
