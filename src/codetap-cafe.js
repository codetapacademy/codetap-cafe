import React, { useState, useEffect, useRef } from "react";
import "./codetap-cafe.css";

import { firestore } from "./firebase";

const CodetapCafe = () => {
  const [nameList, setNameList] = useState([]);
  const formRef = useRef(null);
  useEffect(() => {
    firestore.collection("chat").onSnapshot(snapshot => {
      setNameList(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      );
    });
  }, []);
  const renderNameList = () => {
    return nameList.map(({ name, id }) => {
      return (
        <div key={id} data-id={id}>
          {name}
        </div>
      );
    });
  };
  const handleSubmit = e => {
    e.preventDefault();

    const name = formRef.current.name.value;
    firestore.collection("chat").add({ name });
    formRef.current.name.value = "";
  };
  const renderAddName = () => {
    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input name="name" />
        </div>
      </form>
    );
  };
  return (
    <div className="codetap-cafe">
      List of names
      {renderAddName()}
      {renderNameList()}
    </div>
  );
};

export default CodetapCafe;
