import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { StarListeningWhenTableInvitationAccepted } from "./middlewares/kpashiTableSocketListener";
import { soundMiddleware } from "./middlewares/soundprovider";
//let middleware = [thunk];

//const newlist = [...middleware, kpashiTableSocketListener];
const store = createStore(
  rootReducer,
  {},
  applyMiddleware(
    thunk,
    StarListeningWhenTableInvitationAccepted,
    soundMiddleware
  )
);
export default store;
