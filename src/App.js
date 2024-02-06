import React, { useState, useEffect } from 'react';
import './App.css';

const getRandomInt = (max) => Math.floor(Math.random() * max);

const generateHexColor = () => {
  return `#${getRandomInt(256).toString(16).padStart(2, '0')}${getRandomInt(256).toString(16).padStart(2, '0')}${getRandomInt(256).toString(16).padStart(2, '0')}`;
};

function App() {
  const [colors, setColors] = useState([]);
  const [correctColor, setCorrectColor] = useState('');
  const [gameStatus, setGameStatus] = useState('');
  const [countdown, setCountdown] = useState(3);

  const generateRandomColors = () => {
    const newColors = [generateHexColor(), generateHexColor(), generateHexColor()];
    setColors(newColors);
    setCorrectColor(newColors[getRandomInt(newColors.length)]);
  };

  const handleSwatchClick = (color) => {
    if (color === correctColor) {
      setGameStatus('Correct!');
    } else {
      setGameStatus('Incorrect!');
    }
  };

  const resetGame = () => {
    setCountdown(3);
    setGameStatus('');
  };

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      generateRandomColors();
    }
  }, [countdown]);

  return (
    <div className="game-container">
      {countdown > 0 ? (
        <div className="countdown">Starting in {countdown}...</div>
      ) : (
        <>
          <div className="swatches-container">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`color-swatch ${gameStatus === 'Incorrect!' && color === correctColor ? 'correct-swatch' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleSwatchClick(color)}
              >
                {gameStatus && <span className="color-text">{color.toUpperCase()}</span>}
              </div>
            ))}
          </div>
          <div className={`color-display ${gameStatus === 'Incorrect!' ? 'incorrect' : ''}`}>
            Guess this color: {correctColor.toUpperCase()}
          </div>
          <div className={`game-status ${gameStatus === 'Incorrect!' ? 'incorrect' : ''}`}>
            {gameStatus}
          </div>
          <button onClick={resetGame}>Reset/Play Again</button>
        </>
      )}
    </div>
  );
}

export default App;