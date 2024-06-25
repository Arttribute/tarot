import React from 'react';

interface ModalProps {
    title: string;
    description: string;
    imageUrl: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, description, imageUrl, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col justify-center items-center">
                <img src={imageUrl} className="w-80 h-80 object-contain p-3" alt={title} />
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">{title}</h2>
                    <p className="mb-4 w-96">{description}</p>
                    <button
                        onClick={onClose}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
