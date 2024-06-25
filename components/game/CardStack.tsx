import React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card'; // Adjust the import path as necessary

interface CardStackProps {
    title: string;
    imageUrl: string;
}

const CardStack: React.FC<CardStackProps> = ({ title, imageUrl }) => {
    const hasImage = Boolean(imageUrl);

    return (
        <div className="relative w-60 h-60 justify-center">
            <Card className="bg-white shadow-lg">
                <div className="absolute left-0 right-0 bottom-12 bg-white rounded-lg overflow-hidden flex justify-center items-center">
                    {hasImage ? (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="max-w-full max-h-full object-contain p-2"
                        />
                    ) : (
                        <div className="w-72 h-[374px] p-2 object-contain bg-gray-300"></div>
                    )}
                </div>
                <CardHeader className="absolute bottom-0 left-0 right-0 bg-pink-600 bg-opacity-50 text-white flex items-center justify-center py-2">
                    <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                </CardHeader>
            </Card>

        </div>
    );
};

export default CardStack;
