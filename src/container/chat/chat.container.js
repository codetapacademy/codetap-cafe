import React from "react";
import styled from "styled-components";

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
  return (
    <ChatWrapper>
      <ChatBody>Chat body</ChatBody>
    </ChatWrapper>
  );
};

export default Chat;
