'use client';
import React, { useState } from 'react';
import Landing from '../../components/game/Landing';
import Story from '../../components/game/Story';
import Shuffle from '../../components/game/Shuffle';
import Fortune from '../../components/game/Fortune';
import Share from '../../components/game/Share';
import About from '../../components/game/About';

const Play: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'story':
        return <Story onNext={() => setCurrentPage('shuffle')} onBack={() => setCurrentPage('landing')} />;
      case 'shuffle':
        return <Shuffle onNext={() => setCurrentPage('fortune')} onBack={() => setCurrentPage('story')} />;

      case 'fortune':
        return <Fortune onNext={() => setCurrentPage('share')} onBack={() => setCurrentPage('shuffle')}/>;
     
      case 'share':
        return <Share onNewReading={() => setCurrentPage('landing')} />;
      //onBack={() => setCurrentPage('fortune')} 
      case 'about':
        return <About />;
      default:
        return <Landing onNext={() => setCurrentPage('story')} />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default Play;
