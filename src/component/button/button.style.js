import styled from "styled-components";

const ButtonStyle = styled.button`
  color: ${({color = 'fff'}) => `#${color}`};
  font-weight: bold;
  padding: 10px 25px;
  width: 100%;
  height: 100%;
`;

export default ButtonStyle;
