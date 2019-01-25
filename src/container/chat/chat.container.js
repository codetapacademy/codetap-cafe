import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import TextArea from "../../component/text-area";
import { firebase, firestore } from "../../firebase";
import { getState, DispatchContext } from "../../redux";
import Button from "../../component/button";

const ChatWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-template-rows: 1fr 60px;
  height: 100%;
  grid-gap: 5px;
  padding: 5px;
`;

const ChatBody = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
`;

const ChatMessage = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px 1fr;
`;

const ChatUser = styled.div`
  font-weight: bold;
  white-space: nowrap;
`;

const TextAreaWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
`;

const ButtonWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
`;

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const dispatch = useContext(DispatchContext);
  const messageList = getState("messageList");
  const user = getState("user");

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
          .filter(message => message && message.time);

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
      .add({ message, updatedAt, user: { ...user } })
      .then(docRef => {
        console.log(`Success! handleSumbit()`);
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
      <ChatBody>
        {messageList.map(({ message, user, id }) => (
          <React.Fragment key={id}>
            <ChatUser>{user.displayName}:</ChatUser>
            <div className="chat__message">{message}</div>
          </React.Fragment>
        ))}
      </ChatBody>
      <TextAreaWrapper>
        <TextArea
          placeholder="Write a message"
          onKeyDown={handleOnKeyDown}
          value={currentMessage}
        />
      </TextAreaWrapper>
      <ButtonWrapper>
        <Button label="Send" disabled={!currentMessage} />
      </ButtonWrapper>
    </ChatWrapper>
  );
};

export default Chat;
