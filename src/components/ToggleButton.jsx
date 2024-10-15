import { useState } from "react";
import styled from "styled-components";

const Background = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  background-color: gray;
  box-sizing: border-box;
  width: ${({ size }) => 2 * size}px;
  height: ${({ size }) => size}px;
  border-radius: 100px;
  padding: 2px;
  box-shadow: 0px 0px 7px 1px black inset;

  &.active {
    background-color: royalblue;
    justify-content: flex-end;
  }
`;

const Slider = styled.div`
  background-color: white;
  width: 50%;
  height: 100%;
  border-radius: 100%;
  float: left;
  transition: all 5s linear;
`;

export default function ToggleButton({ onToggle, value, size }) {
  const [state, setState] = useState(value);
  const active = state ? "active" : "";
  const onClick = () => {
    const newState = !state;
    setState(newState);
    onToggle(newState);
  };
  return (
    <Background
      className={active}
      onClick={onClick}
      size={size || 30}
      role="switch"
      aria-checked={state}
    >
      <Slider />
    </Background>
  );
}
