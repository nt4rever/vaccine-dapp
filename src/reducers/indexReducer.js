import { combineReducers } from "redux";

import infoReducer from "./infoReducer";
import Web3Reducer from "./Web3Reducer";
import accountReducer from "./accountReducer";
import vaccineReducer from "./vaccineReducer"

export const allReducers = combineReducers({
  infoReducer,
  Web3Reducer,
  accountReducer,
  vaccineReducer
  // add more reducers here
});