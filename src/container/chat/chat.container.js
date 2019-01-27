import React, { useState, useRef } from "react";
import TextArea from "../../component/text-area";
import { firebase, firestore } from "../../firebase";
import { getState } from "../../redux";
import Button from "../../component/button";
import useFirestoreQuery from "./chat.service";
import {
  ChatWrapper,
  ChatBody,
  ChatUser,
  TextAreaWrapper,
  ButtonWrapper,
  ChatBodyWrapper
} from "./chat.style";

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  // const currentMessage = "";
  const messageList = getState("messageList");
  const user = getState("user");
  const autoScroll = useRef();

  const ref = firestore.collection("chat").orderBy("updatedAt");
  useFirestoreQuery(ref);

  const handleButtonSubmit = () => {
    handleSubmit(currentMessage.trim());
    setCurrentMessage("");
  };

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

  const handleKeyDown = e => {
    console.log(e);
    if (e.shiftKey && e.key === "Enter") {
      // let the user continue to write on a new line
      console.log(`DON'T Send the message :)`);
    } else if (!e.shiftKey && e.key === "Enter") {
      // send the message away! yeeey
      console.log(`Send the message`);
      handleSubmit(e.target.value.trim());
      setCurrentMessage("");
      e.preventDefault();
    }
  };

  const handleOnChange = e => {
    const { value } = e.target;
    setCurrentMessage(value);
  };

  if (autoScroll.current) {
    autoScroll.current.scrollTop = autoScroll.current.clientHeight;
  }

  console.log(`Just before render of Chat`);
  return (
    <ChatWrapper>
      <ChatBodyWrapper ref={autoScroll}>
        <ChatBody>
          {messageList.data.map(({ message, user, id }) => (
            <React.Fragment key={id}>
              <ChatUser>{user.displayName}</ChatUser>
              <div className="chat__message">{message}</div>
            </React.Fragment>
          ))}
        </ChatBody>
      </ChatBodyWrapper>
      <TextAreaWrapper>
        <TextArea
          placeholder="Write a message"
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          value={currentMessage}
        />
      </TextAreaWrapper>
      <ButtonWrapper>
        <Button
          label="Send"
          disabled={!currentMessage}
          onClick={handleButtonSubmit}
        />
      </ButtonWrapper>
    </ChatWrapper>
  );
};

export default Chat;
