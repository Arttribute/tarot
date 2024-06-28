"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card } from "../ui/card";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../game/Styles/Animations.css";

interface ShuffleProps {
  onNext: () => void;
  onBack: () => void;
}

const Shuffle: React.FC<ShuffleProps> = ({ onNext, onBack }) => {
  const heading = "First, we must shuffle the cards . . .";
  const paragraph =
    "As we do, focus on a question for the cards. Send this question to them as they prepare.";
  const wordsHeadingShuffle = heading.split(" ");
  const wordsParagraphShuffle = paragraph.split(" ");

  const cardRefs = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const timeline = gsap.timeline({ repeat: -1 });
    // Initial swirl animation
    timeline.fromTo(
      cardRefs.current,
      {
        rotation: 0,
        zIndex: (index) => index,
      },
      {
        rotation: 360,
        zIndex: (index) => cardRefs.current.length - index,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.inOut",
      }
    );

    // Animation to move the top card to the bottom
    timeline.to(cardRefs.current, {
      duration: 1,
      rotation: 0,
      zIndex: (index) => cardRefs.current.length - index,
      stagger: 0.1,
      onComplete: () => {
        const topCard = cardRefs.current.shift();
        if (topCard) {
          cardRefs.current.push(topCard);
        }
      },
    });

    timeline.to(cardRefs.current, {
      duration: 1,
      rotation: 0,
      zIndex: (index) => cardRefs.current.length - index,
      stagger: 0.1,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="absolute top-20 left-36">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-14 h-14 bg-gray-400 text-white px-4 py-2 rounded-full transform transition-transform duration-300 ease-in-out hover:scale-110"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
        </button>
      </div>
      <div className="relative text-center p-2 rounded-lg top-[-190px]">
        <h1 className="text-xl font-bold mb-2">
          {wordsHeadingShuffle.map((word, index) => (
            <span key={index} className={`word word-heading-shuffle`}>
              {word}&nbsp;
            </span>
          ))}
        </h1>
        <p className="text-sm mb-8">
          {wordsParagraphShuffle.map((word, index) => (
            <span key={index} className={`word-paragraph`}>
              {word}&nbsp;
            </span>
          ))}
        </p>
      </div>

      <div className="relative bg-white top-[-200px] left-[-140px]">
        <div className="mt-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card
              key={index}
              ref={(el) => {
                if (el && !cardRefs.current.includes(el))
                  cardRefs.current[index] = el;
              }}
              className="absolute custom-background w-60 h-[22rem] border border-white rounded-xl overflow-hidden"
              style={{ top: 0, left: 0 }}
            >
              <div className="inside_card custom-background"></div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shuffle;
