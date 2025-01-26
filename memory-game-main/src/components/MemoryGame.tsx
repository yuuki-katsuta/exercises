import { useState } from "react";
import { shuffle } from "lodash";

import "./MemoryGame.css";

interface Props {
  images: string[];
}

const MemoryGame = ({ images }: Props) => {
  const [cards, setCards] = useState(() => {
    return shuffle([...images, ...images]);
  });
  const [flippedIdx, setFlippedIdx] = useState<number>(NaN);
  const [founded, setFounded] = useState<{ [select: number]: boolean }>({});

  const isCompleted = Object.values(founded).length === cards.length;

  const isVisible = (idx: number) => {
    const isSelected = idx === flippedIdx;
    const isMatched = founded[idx];
    return isSelected || isMatched;
  };

  const handleSelect = (idx: number) => {
    if (cards[flippedIdx] === cards[idx]) {
      setFounded((prev) => ({ ...prev, [idx]: true, [flippedIdx]: true }));
      return;
    }
    setFlippedIdx(idx);
  };

  const handleReset = () => {
    setCards(shuffle([...images, ...images]));
    setFlippedIdx(NaN);
    setFounded({});
  };

  return (
    <div>
      <h1>Memory Game</h1>
      {isCompleted && (
        <>
          <p>congratulations!!</p>
          <button onClick={handleReset}>reset</button>
        </>
      )}
      <div className="board">
        {cards.map((image, idx) =>
          isVisible(idx) ? (
            <img key={idx} src={image} className="card" />
          ) : (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              className="card placeHolder"
            />
          )
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
