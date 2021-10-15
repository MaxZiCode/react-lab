import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import modalsReducer from "./modals/modalsReducer";
import productsReducer from "./products/productsReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({ user: userReducer, products: productsReducer, modals: modalsReducer });
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
