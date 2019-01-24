import { createContext, useContext } from "react";

export const initialState = {
  messageList: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_LIST":
      // debugger;
      return {
        ...state,
        messageList: [...state.messageList, ...action.payload]
      };
    default:
      return state;
  }
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext();
export const getState = property => useContext(StateContext)[property];
