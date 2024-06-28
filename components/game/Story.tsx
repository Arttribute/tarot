import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import CardStack from "../game/Card_stack";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../game/Styles/Animations.css";

interface StoryProps {
  onNext: () => void;
  onBack: () => void;
}

const Story: React.FC<StoryProps> = ({ onNext, onBack }) => {
  // animating the text
  const heading = "This is the Tarot deck.";
  const paragraph =
    "40 cards that can tell you of your past, present and future";
  const sentence = "~ Click on the deck to continue ~";
  const wordsContinue = sentence.split(" ");
  const wordsHeading = heading.split(" ");
  const wordsParagraph = paragraph.split(" ");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="relative top-[-20px] justify-center text-center rounded-lg">
        <h1 className="text-2xl font-bold mb-2 text-white">
          {wordsHeading.map((word, index) => (
            <span key={index} className={`word word-heading`}>
              {word}&nbsp;
            </span>
          ))}
        </h1>
        <p className="text-sm text-white">
          {wordsParagraph.map((word, index) => (
            <span key={index} className={`word-paragraph`}>
              {word}&nbsp;
            </span>
          ))}
        </p>
      </div>

      <div className="flex items-center justify-center top-[-10px]">
        <div className="relative cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105">
          <CardStack />
        </div>
      </div>

      <div className="relative text-center">
        <p className="text-base font-semibold mb-2 text-white">
          {" "}
          {wordsContinue.map((word, index) => (
            <span key={index} className={`word-continue-shuffle`}>
              {word}&nbsp;
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Story;
