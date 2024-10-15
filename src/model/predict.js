import MinMax from "./MinMax";

const EASY = MinMax.EASY;
const HARD = MinMax.HARD;

onmessage = (e) => {
  const { board, player, isEasy } = e.data;

  let level = HARD;
  if (isEasy) {
    level = Math.random(1) <= 0.7 ? EASY : HARD;
  }
  const minMax = new MinMax(player);
  const result = minMax.maximize(board, level);
  postMessage(result);
};
