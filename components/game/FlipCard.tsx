import React from 'react';

interface FlipCardProps {
    title: string;
    imageUrl: string;
    description: string;

    buttonText: string;
    onButtonClick: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({
    title,
    imageUrl,
    description,
   
    buttonText,
    onButtonClick,
}) => {
    return (
        <div className="w-[300px] h-[420px] bg-transparent cursor-pointer perspective">
            <div className="relative w-full h-full transition-transform duration-1000 transform group" onClick={() => {}}>
               
                <div className="absolute my-rotate-y-180 w-full h-full bg-white rounded-lg shadow-lg backface-hidden" style={{ backgroundImage: `url('')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="text-center flex flex-col items-center justify-center h-full text-gray-800 p-6">
                        <h1 className="text-2xl font-bold mb-2">{title}</h1>
                        
                        <p className="mb-6">{description}</p>
                        <button
                            className="bg-pink-500 px-6 py-2 font-semibold text-white rounded-full absolute -bottom-10 delay-500 duration-1000 group-hover:bottom-6 scale-0 group-hover:scale-100"
                            onClick={onButtonClick}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
