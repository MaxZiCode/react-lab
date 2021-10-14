import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({ user: userReducer });
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
