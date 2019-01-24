import React, { useState } from "react";
import styled from "styled-components";
import TextArea from "../../component/text-area";
import { firebase, firestore } from "../../firebase";

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

  const handleSubmit = message => {
    const updatedAt = firebase.firestore.FieldValue.serverTimestamp();

    firestore
      .collection("chat")
      .add({ name: message, updatedAt })
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
    console.log(e.shiftKey, e.key);

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
      <ChatBody>
        <TextArea
          placeholder="Write a message"
          onKeyDown={handleOnKeyDown}
          value={currentMessage}
        />
      </ChatBody>
    </ChatWrapper>
  );
};

export default Chat;
