import React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card'; // Assuming you have exported Card component from the provided file
import CardStack from '../game/Card_stack';

interface StoryProps {
    onNext: () => void;
}

const Story: React.FC<StoryProps> = ({ onNext }) => {
    //animating the text
    const heading = "This is the Tarot deck.";
    const paragraph = "40 cards that can tell you of your past, present and future";
    const wordsHeading = heading.split(" ");
    const wordsParagraph = paragraph.split(" ");

    //moves to the shuffle section of the game
    const handleCardClick = () => {
        onNext();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="relative top-[-20px] justify-center text-center rounded-lg ">
                <h1 className="text-3xl font-bold mb-2">  {wordsHeading.map((word, index) => (
                    <span key={index} className={`word word-heading`}>{word}&nbsp;</span>
                ))}</h1>
                <p className="text-lg">
                    {wordsParagraph.map((word, index) => (
                        <span key={index} className={`word-paragraph`}>{word}&nbsp;</span>
                    ))}
                </p>
            </div>

            <div className="relative justify-center top-[-10px]">
                <div
                    onClick={handleCardClick}
                    className="relative cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
                >
                    {/* <Card className="relative custom-background left-0 w-60 h-96 right-0 rounded-lg overflow-hidden justify-center">
          </Card> */}
                    <CardStack />
                </div>
            </div>


            <div className="relative text-center">
                <p className="text-xl font-semibold mb-2">~ Click to continue ~</p>

            </div>
        </div>
    );
};

export default Story;
