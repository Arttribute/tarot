import React, { useState, useEffect } from 'react';
import FlipCard from './FlipCard';
import Modal from '../ui/Modal';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FortuneProps {
  onNext: () => void;
  onBack: () => void;
}

const Fortune: React.FC<FortuneProps> = ({ onNext, onBack }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContents, setModalContents] = useState({
    title: '',
    description: '',
    rating: '',
    imageUrl: '',
  });
  const [usedModalIndices, setUsedModalIndices] = useState<number[]>([]);
  const [cardContents, setCardContents] = useState<any[]>([]);

  const heading = "View your Fortunes";
  const wordsHeading = heading.split(" ");
  const cardOptions = ['Past', 'Present', 'Future'];

  const allModalContents = [
    {
      title: 'The Fool',
      description: 'This symbolizes new beginnings, adventure, and embracing the unknown with optimism and spontaneity. This suggests that you are on the brink of a new journey or phase in life.',
      rating: '9.0 Rating',
      imageUrl: '/images/the_fool.jpg',
    },
    {
      title: 'Strength',
      description: 'It reflects your inner resilience and courage, encouraging you to approach challenges with patience and compassion rather than force.',
      rating: '8.5 Rating',
      imageUrl: '/images/strength.jpg',
    },
    {
      title: 'The Empress',
      description: 'It embodies creativity, abundance, and nurturing energy. Seeing this card suggests that you are entering a period of growth and fertility, where your creative potential and nurturing abilities will flourish.',
      rating: '9.5 Rating',
      imageUrl: '/images/the_empress.jpg',
    },
    {
      title: 'The Chariot',
      description: 'This symbolizes triumph, willpower, and harnessing inner conflicts to achieve goals. Your question likely relates to overcoming obstacles and gaining control over a situation, and seeing the Chariot suggests you have the strength and determination needed to succeed.',
      rating: '9.5 Rating',
      imageUrl: '/images/the_chariot.jpg',
    },
    {
      title: 'The Emperor',
      description: 'It signifies authority, structure, and taking a disciplined approach to leadership and decision-making. Your question likely pertains to issues of control or seeking guidance from a strong, authoritative figure.',
      rating: '9.5 Rating',
      imageUrl: '/images/the_emperor.jpg',
    },
    {
      title: 'The Hierophant',
      description: 'It represents tradition, spiritual guidance, and conformity to established beliefs or teachings. Your question may relate to seeking advice from a mentor or finding meaning through traditional wisdom or institutions.',
      rating: '9.5 Rating',
      imageUrl: '/images/the_hierophant.jpg',
    },
  ];

  useEffect(() => {
    const initializeCardContents = () => {
      const selectedContents = cardOptions.map(() => {
        const unusedIndices = allModalContents
          .map((_, index) => index)
          .filter(index => !usedModalIndices.includes(index));

        const randomIndex = unusedIndices[Math.floor(Math.random() * unusedIndices.length)];

        setUsedModalIndices((prevIndices) => [...prevIndices, randomIndex]);

        return allModalContents[randomIndex];
      });

      setCardContents(selectedContents);
    };

    initializeCardContents();
  }, []);

  const handleCardClick = (cardIndex: number) => {
    const selectedModalContent = cardContents[cardIndex];
    setModalContents(selectedModalContent);

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className='absolute top-20 left-36'>
        <button
          onClick={onBack}
          className="flex flex-col float-left justify-center items-center  w-14 h-14 bg-gray-400 text-white px-4 py-2 rounded-full transform transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <FontAwesomeIcon icon={faArrowLeft} className='text-2xl' />
        </button>
      </div>
      <div className="text-center mb-8 top-[-20px]">
        <h1 className="text-3xl font-bold">{wordsHeading.map((word, index) => (
          <span key={index} className={`word word-heading-shuffle`}>{word}&nbsp;</span>
        ))}</h1>
      </div>
      <div className="flex flex-row justify-center gap-8 mb-8">
        {cardOptions.map((option, index) => (
          <div
            key={index}
            style={{ cursor: 'pointer' }}
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
      {modalVisible && (
        <Modal
          title={modalContents.title}
          description={modalContents.description}
          imageUrl={modalContents.imageUrl}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Fortune;
