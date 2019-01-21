import React, { createContext, useReducer, useEffect, useRef } from "react";
import "./codetap-cafe.css";

import { firestore } from "./firebase";
import Auth from "./container/auth";
import { initialState, reducer} from './redux';

// import AddName from "./component/add-name";

export const StateContext = createContext(initialState);
export const DispatchContext = createContext();

const CodetapCafe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    console.log(state.nameList)
    return state.nameList.map(({ name, id }) => {
      return (
        <div key={id} data-id={id}>
          {name}
        </div>
      );
    });
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   // const name = this.refs["my-form"].name.value;
  //   // const name = useRef(null);
  //   // this.refs["my-form"].name.value = "";
  // };
  
  const renderAddName = () => {
    const name = useRef(null);
    
    const handleSubmit = (event) => {
      const ceva = name.current.value;
      event.preventDefault();
      firestore.collection("chat").add({ ceva });
      console.log(name.current.value)
    }
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label  htmlFor="name">Name:</label>
          <input name="name" ref={name} />
          <button onClick={handleSubmit}>try</button>
          </div>
      </form>
    );
  };
  // // console.log(state)


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
