import MinMax from './MinMax';

const EASY = MinMax.EASY;
const HARD = MinMax.HARD;

export function predict(board, player, isEasy) {
  let level = HARD;
  if (isEasy) {
    level = Math.random(1) <= 0.7? EASY : HARD;
  }
  const minMax = new MinMax(player);
  const result = minMax.maximize(board, level);
  return result;
}
