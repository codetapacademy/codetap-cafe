import styled from "styled-components";

const ChatWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-template-rows: 1fr 60px;
  height: calc(100% - 45px);
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

const ChatBodyWrapper = styled.div`
  overflow-y: scroll;
`;
// display: flex;
// align-items: flex-end;

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

export {
  ChatWrapper,
  ChatBody,
  ChatUser,
  TextAreaWrapper,
  ButtonWrapper,
  ChatBodyWrapper
};
