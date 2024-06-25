import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"; // Adjust the path as needed

const tarotCards = [
  {
    title: "The Fool",
    description: "New beginnings, optimism, trust in life",
    content: "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, improvisation, and believing that the universe provides.",
  },
  {
    title: "The Magician",
    description: "Action, the power to manifest",
    content: "The Magician represents conscious awareness, using talents, power, and resources, creating the reality you want, being creative, and seeing things clearly.",
  },
  // Add more cards here
];

interface TarotDeckProps {
  onNext: () => void;
}

const TarotDeck: React.FC<TarotDeckProps> = ({ onNext }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tarotCards.map((card, index) => (
          <Card key={index} className="max-w-xs mx-auto">
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{card.content}</p>
            </CardContent>
            <CardFooter>
              <button className="text-primary hover:underline">Read More</button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TarotDeck;
