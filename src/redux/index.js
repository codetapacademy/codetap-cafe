import { createContext, useContext } from "react";

export const initialState = {
  messageList: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_LIST":
      // debugger;
      let messageList = [...state.messageList];
      action.payload.forEach(message => {
        if (message.type === "added") {
          messageList = [...messageList, message];
        } else if (message.type === "removed") {
          messageList = messageList.filter(m => m.id !== message.id);
        }
      });
      return {
        ...state,
        messageList
      };
    default:
      return state;
  }
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext();
export const getState = property => useContext(StateContext)[property];
