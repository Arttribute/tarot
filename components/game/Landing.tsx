import React from 'react';
import CardStack from './CardStack'; // Adjust the import path as necessary

interface LandingProps {
    onNext: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNext }) => {

    const sentence = "~ Click the deck of cards to start the story ~";
    const words = sentence.split(" ");


    const cardData = {
        title: "The Magician",
        imageUrl: "/images/the_magician.jpg", // Replace with your tarot card image URL
    };

    const handleCardClick = () => {
        onNext(); // Trigger the same action as the button click
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div onClick={handleCardClick} style={{ cursor: 'pointer' }} className="relative items-center justify-center top-20 bottom-10 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-md">

                <CardStack
                    title={cardData.title}
                    imageUrl={cardData.imageUrl}
                />

            </div>
            <div className="relative text-center top-28">
                <p className="text-xl font-semibold mb-2">
                    {words.map((word, index) => (
                        <span key={index} className="word">{word}&nbsp;</span>
                    ))}
                </p>

            </div>
        </div>
    );
};

export default Landing;
