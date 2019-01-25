import React, { useState, useEffect, useContext } from "react";
import TextArea from "../../component/text-area";
import { firebase, firestore } from "../../firebase";
import { getState, DispatchContext } from "../../redux";
import Button from "../../component/button";
import {
  ChatWrapper,
  ChatBody,
  ChatUser,
  TextAreaWrapper,
  ButtonWrapper
} from "./chat.style";

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
