import React, { createContext, useReducer, useEffect, useRef } from "react";
import "./codetap-cafe.css";

import { firestore } from "./firebase";
import Auth from "./container/auth";
import { initialState, reducer} from './redux';


export const StateContext = createContext(initialState);
export const DispatchContext = createContext();


const CodetapCafe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputValue = useRef(null);


  useEffect(() => {
    firestore.collection("chat").onSnapshot(snapshot => {
      const names = {
        nameList: snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      };

      dispatch({
        type: 'TEST',
        payload: names.nameList
      });
    });
  }, []);

  const renderNameList = () => {
    return state.nameList.map(({ name, id }) => {
      return (
        <div key={id} data-id={id}>
          {name}
        </div>
      );
    });
  };

  const handleSubmit = (event) => {
    const name = inputValue.current.value;
    event.preventDefault();
    firestore.collection("chat").add({ name });
  }

  const renderAddName = () => {
    
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label  htmlFor="name">Name:</label>
          <input name="name" ref={inputValue} />
          <button onClick={handleSubmit}>try</button>
          </div>
      </form>
    );
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="codetap-cafe">
          <div>
            <Auth />
          </div>
          List of names
          {renderAddName()}
          {renderNameList()}
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default CodetapCafe;
