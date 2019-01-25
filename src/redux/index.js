import { createContext, useContext } from "react";

export const initialState = {
  messageList: [],
  user: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload
      };
    case "UPDATE_LIST":
      // debugger;
      let messageList = [...state.messageList];
      action.payload.forEach(message => {
        if (message.type === "added") {
          messageList = [...messageList, message];
        } else if (message.type === "modified") {
          const messageExists = messageList.filter(m => message.id === m.id)
            .length;
          if (messageExists) {
            // Check if it exists
            messageList = messageList.map(m =>
              m.id === message.id ? message : m
            );
          } else {
            // or add it otherwise
            messageList = [...messageList, message];
          }
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
