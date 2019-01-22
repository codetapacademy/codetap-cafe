import React, { createContext, useReducer, useEffect, useRef } from "react";
import "./codetap-cafe.css";

import { firestore, firebase } from "./firebase";
import Auth from "./container/auth";
import { initialState, reducer } from "./redux";
import Chat from "./container/chat";

import styled from "styled-components";

// import AddName from "./component/add-name";

export const StateContext = createContext(initialState);
export const DispatchContext = createContext();

const CodetapCafeWrapper = styled.div`
  height: 100%;
`;

const CodetapCafe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nameRef = useRef(null);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("chat")
      .orderBy("updatedAt")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(({ type }) => {
          if (type === "added") {
            dispatch({
              type: "TEST",
              payload: snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
              }))
            });
          }
        });
      });
  }, []);

  const renderNameList = () => {
    console.log(state.nameList.length);
    return state.nameList.length ? (
      state.nameList.map(({ name, id, updatedAt = { seconds: 0 } }) => {
        return (
          <div key={id} data-id={id}>
            {name}
          </div>
        );
      })
    ) : (
      <div>Loading data</div>
    );
  };

  const handleSubmit = e => {
    const updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    e.preventDefault();
    firestore
      .collection("chat")
      .add({ name: nameRef.current.value, updatedAt })
      .then(docRef => {
        console.log(`Success! handleSumbit()`);
        // Object.keys(docRef),
        // docRef.firestore,
        // docRef.id
      })
      .catch(error => {
        console.log(`Error! handleSumbit()`, error);
      });
    nameRef.current.value = "";
  };

  const renderAddName = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input ref={nameRef} name="name" />
        </div>
      </form>
    );
  };
  // console.log(state)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <CodetapCafeWrapper className="codetap-cafe">
          <div>
            <Auth />
          </div>
          <Chat />
          {/* List of names
          {renderAddName()}
          {state.nameList.length ? renderNameList() : "Loading ..."} */}
        </CodetapCafeWrapper>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default CodetapCafe;
