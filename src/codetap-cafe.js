import React, { useReducer } from "react";
import "./codetap-cafe.css";

import Auth from "./container/auth";
import { initialState, reducer } from "./redux";
import Chat from "./container/chat";
import styled from "styled-components";
import { DispatchContext, StateContext } from "./redux";

const CodetapCafeWrapper = styled.div`
  height: 100%;
`;

const CodetapCafe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <CodetapCafeWrapper className="codetap-cafe">
          <div>
            <Auth />
          </div>
          <Chat />
        </CodetapCafeWrapper>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default CodetapCafe;
