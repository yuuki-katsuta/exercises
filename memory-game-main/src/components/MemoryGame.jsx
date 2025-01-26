const MemoryGame = ({ images }) => {
  return (
    <div>
      <h1>Memory Game</h1>
      <p>Build your memory game! </p>
      <p>Here are the sample images:</p>
      {images.map((image) => (
        <img
          key={image}
          src={image}
          style={{ width: "300px", padding: "10px" }}
        />
      ))}
    </div>
  );
};

export default MemoryGame;
