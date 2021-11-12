import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import cartReducer from "./cart/cartReducer";
import profileReducer from "./profile/profileReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  cart: cartReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
