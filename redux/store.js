import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { StarListeningWhenTableInvitationAccepted } from "./middlewares/kpashiTableSocketListener";
//let middleware = [thunk];

//const newlist = [...middleware, kpashiTableSocketListener];
const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunk, StarListeningWhenTableInvitationAccepted)
);
export default store;
