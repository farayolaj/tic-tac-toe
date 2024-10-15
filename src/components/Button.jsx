import styled from "styled-components";

const StyledButton = styled.button`
  box-sizing: content-box;
  padding: 10px 15px;
  border: none;
  outline: none;
  background-color: royalblue;
  color: white;
  text-shadow: 0 0 4px rgb(3, 40, 148);
  font: inherit;
  min-width: 100px;
  margin: 10px;
  transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0px 0px 7px 1px black inset;

  &:hover {
    background-color: rgb(64, 104, 226);
  }

  &:active {
    background-color: rgb(3, 40, 148);
  }
`;

export default function Button(props) {
  return <StyledButton {...props}>{/* {children} */}</StyledButton>;
}
