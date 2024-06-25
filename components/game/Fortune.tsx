import React, { useState } from 'react';
import FlipCard from './FlipCard';
import Modal from '../ui/Modal';

interface FortuneProps {
  onNext: () => void;
}

const Fortune: React.FC<FortuneProps> = ({ onNext }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContents, setModalContents] = useState({
    title: '',
    description: '',
    rating: '',
    imageUrl: '',
  });
  const [usedModalIndices, setUsedModalIndices] = useState<number[]>([]);

  // Predefined card options for Past, Present, and Future
  const cardOptions = [
    {
      id: 1,
      title: 'Past',
      imageUrl: '/images/strength.jpg',
      description: 'Let\'s go back in time',
    },
    {
      id: 2,
      title: 'Present',
      imageUrl: '/images/the_fool.jpg',
      description: 'And as for now...',
    },
    {
      id: 3,
      title: 'Future',
      imageUrl: '/images/the_empress.jpg',
      description: 'Where will all these lead?',
    },
  ];

  // Array of possible modal content options
  const allModalContents = [
    {
      title: 'The Fool',
      description: 'This symbolizes new beginnings, adventure, and embracing the unknown with optimism and spontaneity. This suggests that you are on the brink of a new journey or phase in life.',
      rating: '9.0 Rating',
      imageUrl: '/images/the_fool.jpg',
    },
    {
      title: 'Strength',
      description: 'It reflects your inner resilience and courage, encouraging you to approach challenges with patience and compassion rather than force. ',
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
      description: 'This  symbolizes triumph, willpower, and harnessing inner conflicts to achieve goals. Your question likely relates to overcoming obstacles and gaining control over a situation, and seeing the Chariot suggests you have the strength and determination needed to succeed.',
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

  // Function to handle card click
  const handleCardClick = (cardId: number) => {
    setSelectedCard(cardId);

    // Get unused modal content indices
    const unusedIndices = allModalContents
      .map((_, index) => index)
      .filter(index => !usedModalIndices.includes(index));

    // Randomly select an index from unused indices
    const randomIndex = unusedIndices[Math.floor(Math.random() * unusedIndices.length)];

    // Get selected modal content and update used indices
    const selectedModalContent = allModalContents[randomIndex];
    setModalContents(selectedModalContent);
    setUsedModalIndices([...usedModalIndices, randomIndex]);

    // Show modal
    setModalVisible(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedCard(null); // Ensure setSelectedCard receives a null value correctly
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="text-center mb-10 mt-16">
        <h1 className="text-3xl font-bold">Select a card</h1>
      </div>
      <div className="flex flex-row justify-center gap-8 mb-12">
        {cardOptions.map((card) => (
          <div
            key={card.id}
            style={{ cursor: 'pointer' }}
            className="flex items-center justify-center"
          >
            <FlipCard
              title={card.title}
              imageUrl={card.imageUrl}
              description={card.description}
              buttonText={`View ${card.title}`}
              onButtonClick={() => handleCardClick(card.id)}
            />
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={onNext}
          className="w-40 bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
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
