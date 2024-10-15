import styled from 'styled-components';

const Cell = styled.span`
  display: flex;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  font-size: 5em;
  text-shadow: 0 0 4px rgb(3, 40, 148);
  color: ${props => props.inWinSet ? 'royalblue' : 'white'};
  font-weight: ${props => props.inWinSet ? 'bolder' : 'normal'};

@media (min-width: 992px) {
  display: flex;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  font-size: 6em;
  text-shadow: 0 0 4px rgb(3, 40, 148);
  color: ${props => props.inWinSet ? 'royalblue' : 'white'};
  font-weight: ${props => props.inWinSet ? 'bolder' : 'normal'};
}
`

export default Cell;