import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  itemListReducer,
  itemDetailsReducer,
  itemDeleteReducer,
  itemCreateReducer,
  itemUpdateReducer,
  itemReviewCreateReducer,
  itemTopRatedReducer,
} from "./reducers/itemReducers";

import { cartReducer } from "./reducers/cartReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  itemList: itemListReducer,
  itemDetails: itemDetailsReducer,
  itemDelete: itemDeleteReducer,
  itemCreate: itemCreateReducer,
  itemUpdate: itemUpdateReducer,
  itemReviewCreate: itemReviewCreateReducer,
  itemTopRated: itemTopRatedReducer,

  cart: cartReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
});

const middleware = [thunk];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
//if we cant find the user set it to null

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const tableNoFromStorage = localStorage.getItem("tableInfo")
  ? JSON.parse(localStorage.getItem("tableInfo"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    tableInfo: tableNoFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
