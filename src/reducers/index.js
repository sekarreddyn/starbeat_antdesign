import { combineReducers } from "redux";
import { auth } from "./auth.reducer";
import { errorhandler } from "./errorhandler.reducer";
import { registration } from "./garage.reducer";
import { dashboard } from "./dashboard.reducer";

const rootReducer = combineReducers({
  auth,
  errorhandler,
  registration,
  dashboard
});

export default rootReducer;
