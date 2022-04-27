import { combineReducers } from "redux";

import infoReducer from "./infoReducer";
import Web3Reducer from "./Web3Reducer";
import accountReducer from "./accountReducer";

export const allReducers = combineReducers({
  infoReducer,
  Web3Reducer,
  accountReducer
  // add more reducers here
});