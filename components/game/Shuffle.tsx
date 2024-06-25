import React from 'react';
import { gsap } from 'gsap';
import { Card, CardHeader, CardTitle } from '../ui/card';

interface ShuffleProps {
  onNext: () => void;
}

const Shuffle: React.FC<ShuffleProps> = ({ onNext }) => {
  const shuffleCards = () => {
    // Example GSAP animation for card shuffle
    gsap.to('.card', { rotation: 360, duration: 1, ease: 'power2.out' });
  };

  const handleCardClick = () => {
    onNext(); // Trigger the same action as the button click
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative text-center p-2 rounded-lg top-10">
        <h1 className="text-3xl font-bold mb-2">First, we must shuffle the cards...</h1>
        <p className="text-lg">
          As we do, focus on a question for the cards. Send this question to them as they prepare.
        </p>
      </div>


      <div className="flex flex-col items-center justify-center">
        <div className='relative top-12' onClick={shuffleCards} style={{ cursor: 'pointer' }}>
          <Card className=" w-60 h-72 bg-pink-500 shadow-lg">
            <div className="absolute left-0 bg-pink-500 right-0 rounded-lg overflow-hidden justify-center items-center">
              {/* <img
                                src='/images/the_fool.jpg'
                                alt="Tarot Card"
                                className="max-w-full h-72 object-contain p-2"
                            /> */}
            </div>

          </Card>
        </div>
      </div>



      <div className="relative text-center top-14">
        <p className="text-xl font-semibold ">~ Click deck to shuffle ~</p>
      </div>
      <div className='relative top-16'>
        <button onClick={onNext} className="top-80 bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
          End Shuffle
        </button>
      </div>
    </div>
  );
};

export default Shuffle;
