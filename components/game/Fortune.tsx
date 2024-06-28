import React, { useState, useEffect } from "react";
import FlipCard from "./FlipCard";
import Modal from "./Modal";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="absolute top-20 left-36">
        <button
          onClick={onBack}
          className="flex flex-col float-left justify-center items-center  w-14 h-14 bg-gray-400 text-white px-4 py-2 rounded-full transform transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
        </button>
      </div>
      <div className="text-center mb-8 top-[-20px]">
        <h1 className="text-3xl font-bold">
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
        <button
          onClick={onNext}
          className="relative w-40 bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out top-10"
        >
          Next
        </button>
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
