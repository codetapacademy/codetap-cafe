import React, { useState, useRef, Fragment } from "react";
import TextArea from "../../component/text-area";
import { firebase, firestore, database } from "../../firebase";
import { getState } from "../../redux";
import Button from "../../component/button";
import useFirestoreQuery from "./chat.service";
import {
  ChatWrapper,
  ChatBody,
  ChatUser,
  TextAreaWrapper,
  ButtonWrapper,
  ChatBodyWrapper,
  ChatMemberList,
  ChatMemberAvatar,
  ChatMember,
  ChatMemberWrapper,
  ChatMemberName
} from "./chat.style";

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  // const currentMessage = "";
  const messageList = getState("messageList");
  const memberList = getState("memberList");
  const user = getState("user");

  const autoScroll = useRef();

  const refChat = firestore.collection("chat").orderBy("updatedAt");
  const refMember = firestore.collection("member");
  const refStatus = database.ref("status");

  useFirestoreQuery(refChat, refMember, refStatus);

  const handleButtonSubmit = () => {
    handleSubmit(currentMessage.trim());
    setCurrentMessage("");
  };

  const handleSubmit = message => {
    const updatedAt = firebase.firestore.FieldValue.serverTimestamp();

    firestore.collection("chat").add({ message, updatedAt, user: { ...user } });
    // .then(docRef => {
    //   console.log(`Success! handleSumbit()`);
    // })
    // .catch(error => {
    //   console.log(`Error! handleSumbit()`, error);
    // });
  };

  const handleKeyDown = e => {
    if (e.shiftKey && e.key === "Enter") {
      // let the user continue to write on a new line
    } else if (!e.shiftKey && e.key === "Enter") {
      // send the message away! yeeey
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
    autoScroll.current.scrollTop = autoScroll.current.firstChild.clientHeight;
  }

  // console.log(`Just before render of Chat`);
  return (
    <ChatWrapper>
      <ChatBodyWrapper className="ChatBodyWrapper" ref={autoScroll}>
        <ChatBody className="ChatBody">
          {messageList.data.map(({ message, user, id }) => (
            <Fragment key={id}>
              <ChatUser>{user.displayName}</ChatUser>
              <div className="chat__message">{message}</div>
            </Fragment>
          ))}
        </ChatBody>
        <ChatMemberList>
          {memberList.data.map(({ id, photoURL, displayName, online }) => (
            <ChatMemberWrapper key={id}>
              <ChatMember>
                <ChatMemberAvatar photoURL={photoURL} />
                <ChatMemberName>
                  {online + ""} {displayName}
                </ChatMemberName>
                <div>🗨</div>
              </ChatMember>
            </ChatMemberWrapper>
          ))}
        </ChatMemberList>
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
          color="c00"
          disabled={!currentMessage}
          onClick={handleButtonSubmit}
        />
      </ButtonWrapper>
    </ChatWrapper>
  );
};

export default Chat;
