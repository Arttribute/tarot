import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../game/Styles/Animations.css';

interface ShuffleProps {
  onNext: () => void;
  onBack: () => void;
}

const Shuffle: React.FC<ShuffleProps> = ({ onNext, onBack }) => {
  const heading = "First, we must shuffle the cards . . .";
  const paragraph = "As we do, focus on a question for the cards. Send this question to them as they prepare.";
  const sentence = "~ Click deck to shuffle ~";
  const wordsContinueShuffle = sentence.split(" ");
  const wordsHeadingShuffle = heading.split(" ");
  const wordsParagraphShuffle = paragraph.split(" ");

  const cardRefs = useRef<HTMLDivElement[]>([]);

  const shuffleCards = () => {
    // Implementing the stacking animation logic
    gsap.fromTo(cardRefs.current, {
      y: (index) => index * 30,
      zIndex: (index) => index,
    }, {
      y: 0,
      zIndex: (index) => cardRefs.current.length - index,
      duration: 1.5,
      stagger: 0.1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(cardRefs.current, {
          duration: 1,
          y: 0,
          zIndex: (index) => cardRefs.current.length - index,
          stagger: 0.1,
          onComplete: () => {
            gsap.to(cardRefs.current, {
              duration: 1,
              y: 0,
              zIndex: 0,
              stagger: 0.1,
              onComplete: () => {
                cardRefs.current.forEach((card, index) => {
                  gsap.set(card, {
                    y: 0,
                    zIndex: index === 0 ? 0 : -1,
                  });
                });
              }
            });
          }
        });
      }
    });
  };

  const handleCardClick = () => {
    onNext(); // Trigger the same action as the button click
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-20 left-36">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-14 h-14 bg-gray-400 text-white px-4 py-2 rounded-full transform transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
        </button>
      </div>
      <div className="relative text-center p-2 rounded-lg top-[-190px]">
        <h1 className="text-3xl font-bold mb-2">{wordsHeadingShuffle.map((word, index) => (
          <span key={index} className={`word word-heading-shuffle`}>{word}&nbsp;</span>
        ))}</h1>
        <p className="text-lg">
          {wordsParagraphShuffle.map((word, index) => (
            <span key={index} className={`word-paragraph`}>{word}&nbsp;</span>
          ))}
        </p>
      </div>

      <div className="relative bg-white top-[-200px] left-[-140px]">
        <div onClick={shuffleCards} style={{ cursor: 'pointer' }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Card
              key={index}
              ref={(el) => {
                if (el && !cardRefs.current.includes(el)) cardRefs.current[index] = el;
              }}
              className="absolute custom-background w-60 h-[22rem] border-black border-2 rounded-lg overflow-hidden"
              style={{ top: 0, left: 0 }}
            >         <div className='inside_card custom-background'></div>
            </Card>
          ))}
        </div>
      </div>

      <div className="relative text-center top-[175px]">
        <p className="text-xl font-semibold">{wordsContinueShuffle.map((word, index) => (
          <span key={index} className={`word-continue-shuffle`}>{word}&nbsp;</span>
        ))}</p>
      </div>
      <div className="relative top-[185px]">
        <button onClick={onNext} className="top-80 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
          End Shuffle
        </button>
      </div>
    </div>
  );
};

export default Shuffle;
