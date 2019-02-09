import styled from "styled-components";

export const ChatWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-template-rows: 1fr 60px;
  height: calc(100% - 45px);
  grid-gap: 5px;
  padding: 5px;
`;

export const ChatBody = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
`;

export const ChatBodyWrapper = styled.div`
  overflow-y: scroll;
  grid-column: 1/3;
  position: relative;
  overflow: hidden;
`;

export const ChatMemberAvatar = styled.div`
  background-size: cover;
  width: 48px;
  height: 48px;
  margin: 5px;
  border-radius: 50%;
  background-image: url(${({ photoURL }) => photoURL});
`;

export const ChatMemberWrapper = styled.div`
  height: 64px;
  position: relative;
`;

export const ChatMember = styled.div`
  &:hover {
    left: -200px;
  }
  cursor: pointer;
  transition: 0.2s;
  left: -60px;
  position: absolute;
  display: grid;
  grid-template-columns: 64px 1fr 64px;
  grid-gap: 5px;
  align-items: center;
  justify-content: center;
`;

export const ChatMemberName = styled.div`
  white-space: nowrap;
`;

export const ChatMemberList = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
// display: flex;
// align-items: flex-end;

export const ChatUser = styled.div`
  font-weight: bold;
  white-space: nowrap;
`;

export const TextAreaWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
`;

export const ButtonWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
`;
