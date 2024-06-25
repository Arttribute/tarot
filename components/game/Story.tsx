import React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card'; // Assuming you have exported Card component from the provided file

interface StoryProps {
    onNext: () => void;
}

const Story: React.FC<StoryProps> = ({ onNext }) => {
    const handleCardClick = () => {
        onNext(); // Trigger the same action as the button click
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="relative text-center max-w-md p-2 rounded-lg">
                <h1 className="text-3xl font-bold mb-2">This is the Tarot deck.</h1>
                <p className="text-lg">
                    40 cards that can tell you of your past, present and future
                </p>
            </div>
            
            <div className="relative w-60 h-60 justify-center top-2">
                
                <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                    <Card className="bg-white shadow-lg">
                        <div className="absolute left-0 w-60 h-72 right-0 bg-pink-500 rounded-lg overflow-hidden relative justify-center items-center">
                            {/* <img
                                src='/images/the_fool.jpg'
                                alt="Tarot Card"
                                className="max-w-full h-72 object-contain p-2"
                            /> */}
                        </div>
                       
                    </Card>
                </div>
            </div>
            <div className="relative text-center top-20">
                <p className="text-xl font-semibold mb-2">~ Click to continue ~</p>
              
            </div>
        </div>
    );
};

export default Story;
