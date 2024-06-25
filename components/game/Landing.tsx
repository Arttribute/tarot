import React from 'react';
import CardStack from './CardStack'; // Adjust the import path as necessary

interface LandingProps {
    onNext: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNext }) => {
    const cardData = {
        title: "The Magician",
        imageUrl: "/images/the_magician.jpg", // Replace with your tarot card image URL
    };

    const handleCardClick = () => {
        onNext(); // Trigger the same action as the button click
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div onClick={handleCardClick} style={{ cursor: 'pointer' }} className="relative items-center justify-center top-32 bottom-10">

                <CardStack
                    title={cardData.title}
                    imageUrl={cardData.imageUrl}
                />

            </div>
            <div className="relative text-center top-36">
                <p className="text-xl font-semibold mb-2">~ Click the deck of cards to start the story ~</p>
              
            </div>
        </div>
    );
};

export default Landing;
