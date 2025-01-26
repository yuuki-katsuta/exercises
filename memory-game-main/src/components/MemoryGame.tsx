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
  const isComplete = Object.values(founded).length === cards.length;

  const handleReset = () => {
    setCards(shuffle([...images, ...images]));
    setFlippedIdx(NaN);
    setFounded({});
  };

  const handleSelect = (idx: number) => {
    if (cards[flippedIdx] === cards[idx]) {
      setFounded((prev) => ({ ...prev, [idx]: true, [flippedIdx]: true }));
      return;
    }
    setFlippedIdx(idx);
  };

  const isVisible = (idx: number) => {
    if (idx === flippedIdx) {
      return true;
    }
    if (founded[idx]) {
      return true;
    }

    return false;
  };

  return (
    <div>
      <h1>Memory Game</h1>
      {isComplete && (
        <>
          <p>congratulations!!</p>
          <button onClick={handleReset}>reset</button>
        </>
      )}
      <div className="board">
        {cards.map((image, idx) => {
          return isVisible(idx) ? (
            <img key={idx} src={image} className="card" />
          ) : (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              className="card placeHolder"
            />
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
