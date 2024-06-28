import React, { useState, useEffect } from "react";
import FlipCard from "./FlipCard";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";

interface FortuneProps {
  onNext: () => void;
  onBack: () => void;
  cardContents: any[];
}

const Fortune: React.FC<FortuneProps> = ({ onNext, onBack, cardContents }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState({
    title: "",
    description: "",
    time_period: "",
    imageUrl: "",
  });
  const heading = "View your Fortunes";
  const wordsHeading = heading.split(" ");
  const cardOptions = ["Past", "Present", "Future"];

  const handleCardClick = (cardIndex: number) => {
    const selectedModalContent = cardContents[cardIndex];
    setModalContents(selectedModalContent);

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="text-center mb-8 top-[-20px]">
        <h1 className="text-xl font-semibold text-white">
          {wordsHeading.map((word, index) => (
            <span key={index} className={`word word-heading-shuffle`}>
              {word}&nbsp;
            </span>
          ))}
        </h1>
      </div>
      <div className="flex flex-row justify-center gap-4 mb-8">
        {cardOptions.map((option, index) => (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            className="flex items-center justify-center"
          >
            {cardContents[index] && (
              <FlipCard
                backTitle={option}
                frontTitle={cardContents[index].title}
                buttonText={`Read More`}
                imageUrl={cardContents[index].imageUrl}
                onButtonClick={() => handleCardClick(index)}
              />
            )}
          </div>
        ))}
      </div>
      <div>
        <Button onClick={onNext} className="px-24">
          Leave
        </Button>
      </div>

      <Modal
        title={modalContents.title}
        description={modalContents.description}
        imageUrl={modalContents.imageUrl}
        onClose={closeModal}
        open={modalOpen}
        timePeriod={modalContents.time_period}
      />
    </div>
  );
};

export default Fortune;
