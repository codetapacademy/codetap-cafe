import React, { useState } from "react";
import styled from "styled-components";
import TextArea from "../../component/text-area";

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

  const handleOnChange = e => {
    const { value } = e.currentTarget;
    setCurrentMessage(value);
  };

  return (
    <ChatWrapper>
      <ChatBody>
        <TextArea
          placeholder="Write a message"
          onChange={handleOnChange}
          value={currentMessage}
        />
      </ChatBody>
    </ChatWrapper>
  );
};

export default Chat;
