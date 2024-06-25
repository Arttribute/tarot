import React from 'react';

interface ShareProps {
  onNewReading: () => void;
}

const Share: React.FC<ShareProps> = ({ onNewReading }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Enjoyed the game?</h1>
        <div className="flex justify-center items-center">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
            onClick={onNewReading}
          >
            Get New Reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
