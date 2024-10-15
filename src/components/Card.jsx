import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 0px 8px rgb(3, 40, 148), 0px 0px 7px 1px black;
  width: fit-content;
  background-color: wheat;
  color: white;
  text-align: center;
  text-shadow: 0 0 4px rgb(3, 40, 148);
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

export default Card;
