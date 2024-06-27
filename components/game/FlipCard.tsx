import React, { useState } from "react";
import "../game/Styles/FlipCard.css";
import "../game/Styles/CardStack.css";

interface FlipCardProps {
  backTitle: string;
  frontTitle: string;
  buttonText: string;
  imageUrl: string;
  onButtonClick: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({
  backTitle,
  frontTitle,
  buttonText,
  imageUrl,
  onButtonClick,
}) => {
  const [isFlipped, setIsFlipped] = useState(true);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={flipCard}
    >
      <div className="flip-card-inner bg-white rounded-2xl flex flex-col justify-center items-center shadow-xl">
        <div className="flex justify-center flex-col items-center rounded-xl p-1">
          <div className="image-container rounded-xl">
            <img
              src={imageUrl}
              alt={frontTitle}
              className="aspect-[6/9] rounded-xl"
            />
            <div className="overlay">
              <h3 className="text-sm text-white font-semibold">{frontTitle}</h3>
            </div>
            <div className="button-container">
              <button
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onButtonClick();
                }}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>

        <div className="flip-card-back custom-background border-2 border-white">
          <div className="custom-background border-2 border-white h-[16.5rem]">
            <div className="flex flex-col items-center justify-center h-[16.5rem] text-white">
              <h1 className="text-3xl font-semibold">{backTitle}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
