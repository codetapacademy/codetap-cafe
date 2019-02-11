import { createContext, useContext } from "react";
import { UPDATE_USER, UPDATE_LIST } from "../container/auth/const";
import {
  UPDATE_MEMBER_LIST,
  UPDATE_MEMBER_STATUS
} from "../container/chat/const";

export const initialState = {
  messageList: {
    isLoading: true,
    data: []
  },
  memberList: {
    isLoading: false,
    data: []
  },
  user: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };

    case UPDATE_MEMBER_STATUS:
      return {
        ...state,
        memberList: {
          data: state.memberList.data.map(member => ({
            ...member,
            status: action.payload[member.uid]
          }))
        }
      };

    case UPDATE_MEMBER_LIST:
      return {
        ...state,
        memberList: {
          data: action.payload
        }
      };

    case UPDATE_LIST:
      let messageList = [...state.messageList.data];
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
        messageList: {
          data: messageList,
          isLoading: false
        }
      };
    default:
      return state;
  }
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext();
export const getState = property => useContext(StateContext)[property];
