import styled from "styled-components";

const ButtonWrapper = styled.div`
  // flex-grow: 1;
`;

const AuthGreetWrapper = styled.div`
  flex-grow: 1;
`;

const AvatarStyled = styled.span`
  width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
  border-radius: 50%;
  background-size: cover;
  margin-right: 1rem;
  background-image: url(${({ url }) => url});
`;

const AuthStyled = styled.span`
  display: flex;
  align-items: center;
`;

export { AuthStyled, AuthGreetWrapper, AvatarStyled, ButtonWrapper };
