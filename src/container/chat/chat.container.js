import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import TextArea from "../../component/text-area";
import { firebase, firestore } from "../../firebase";
import { getState, DispatchContext } from "../../redux";
import Button from "../../component/button";

const ChatWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-template-rows: 1fr 100px;
  height: 100%;
`;

const ChatBody = styled.div`
  grid-columns: 1/2;
  grid-rows: 1/2;
`;

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const dispatch = useContext(DispatchContext);
  const messageList = getState("messageList");
  const user = getState("user");

  console.log(messageList, user);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("chat")
      .orderBy("updatedAt")
      .onSnapshot(snapshot => {
        const docList = snapshot
          .docChanges()
          .map(({ type, doc }) => {
            const { message, updatedAt, user } = doc.data();
            return {
              message,
              time: (updatedAt && updatedAt.seconds) || 0,
              id: doc.id,
              user,
              type
            };
          })
          .filter(message => message);

        docList.length &&
          dispatch({
            type: "UPDATE_LIST",
            payload: docList
          });
      });
    return unsubscribe;
  }, []);

  const handleSubmit = message => {
    const updatedAt = firebase.firestore.FieldValue.serverTimestamp();

    firestore
      .collection("chat")
      .add({ message, updatedAt, user })
      .then(docRef => {
        console.log(`Success! handleSumbit()`);
        // Object.keys(docRef),
        // docRef.firestore,
        // docRef.id
      })
      .catch(error => {
        console.log(`Error! handleSumbit()`, error);
      });
  };

  const handleOnKeyDown = e => {
    if (e.shiftKey && e.key === "Enter") {
      // let the user continue to write on a new line
      console.log(`DON'T Send the message :)`);
    } else if (!e.shiftKey && e.key === "Enter") {
      // send the message away! yeeey
      console.log(`Send the message`);
      handleSubmit(e.target.value.trim());
      e.target.value = "";
      e.preventDefault();
    }

    const { value } = e.currentTarget;
    setCurrentMessage(value);
  };

  return (
    <ChatWrapper>
      <h1>nananan</h1>
      <ChatBody>
        {messageList.map(({ message, id }) => (
          <div key={id}>{message}</div>
        ))}
        <TextArea
          placeholder="Write a message"
          onKeyDown={handleOnKeyDown}
          value={currentMessage}
        />
        <Button label="Send" />
      </ChatBody>
    </ChatWrapper>
  );
};

export default Chat;
