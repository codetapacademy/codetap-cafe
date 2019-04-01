import React, { useReducer } from "react";
import "./codetap-cafe.css";
import { Router } from "@reach/router";

import Auth from "./container/auth";
import { initialState, reducer } from "./redux";
import Chat from "./container/chat";
import styled from "styled-components";
import { DispatchContext, StateContext } from "./redux";
import UserList from "./container/user-list";
import Profile from "./container/profile";

const CodetapCafeWrapper = styled.div`
  height: 100%;
`;

const CodetapCafe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <CodetapCafeWrapper className="codetap-cafe">
          <Auth />
          <Router className="codetap-cafe__router-wrapper">
            <Chat path="/" />
            <UserList path="/user" />
            <Profile path="/my-profile" />
          </Router>
        </CodetapCafeWrapper>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default CodetapCafe;
