"use client";
import React, { useState } from "react";
import Landing from "../../components/game/Landing";
import Story from "../../components/game/Story";
import Shuffle from "../../components/game/Shuffle";
import Fortune from "../../components/game/Fortune";
import Share from "../../components/game/Share";
import About from "../../components/game/About";
import { Button } from "@/components/ui/button";

const Play: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("landing");
  const [input, setInput] = useState<string>("Give me a tarot reading");
  const [loadingReading, setLoadingReading] = useState<boolean>(false);
  const [startReading, setStartReading] = useState<boolean>(false);
  const [readingImages, setReadingImages] = useState<string[]>([]);
  const [cardContents, setCardContents] = useState<any[]>([]);

  async function generateCards() {
    setStartReading(true);
    setLoadingReading(true);
    console.log("Input:", input);
    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: input || "Give me a tarot reading",
        }),
      });
      const result = await response.json();

      await generateImages(result);
      console.log("Prompt result:", result);
      //map the results and image to cardContents and setCardContents
      const cardContents = Object.keys(result).map((key) => {
        return {
          title: result[key].card_name,
          description: result[key].card_reading,
          time_period: key,
          imageUrl: result[key].image_url,
        };
      });
      console.log("Card contents:", cardContents);
      setCardContents(cardContents);
    } catch (error) {
      console.error("Error generating prompt:", error);
    }
    setLoadingReading(false);
  }

  async function generateImages(promptResult: any) {
    try {
      for (const key in promptResult) {
        const card = promptResult[key];
        const imageResponse = await fetch("/api/generation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: card.image_prompt,
          }),
        });
        const imageResult = await imageResponse.json();
        card.image_url = imageResult;
        console.log("Image result:", imageResult);
        setReadingImages([...readingImages, imageResult]);
      }
    } catch (error) {
      console.error("Error generating images:", error);
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case "story":
        return (
          <Story
            onNext={() => setCurrentPage("shuffle")}
            onBack={() => setCurrentPage("landing")}
          />
        );
      case "shuffle":
        return (
          <Shuffle
            onNext={() => setCurrentPage("fortune")}
            onBack={() => setCurrentPage("story")}
          />
        );

      case "fortune":
        return (
          <Fortune
            onNext={() => setCurrentPage("share")}
            onBack={() => setCurrentPage("shuffle")}
            cardContents={cardContents}
          />
        );

      case "share":
        return <Share onNewReading={() => setCurrentPage("landing")} />;
      //onBack={() => setCurrentPage('fortune')}
      case "about":
        return <About />;
      default:
        return <Landing onNext={() => setCurrentPage("story")} />;
    }
  };

  return (
    <div>
      {!startReading && (
        <div onClick={generateCards}>
          <Story
            onNext={() => setCurrentPage("shuffle")}
            onBack={() => setCurrentPage("landing")}
          />
        </div>
      )}
      {startReading && loadingReading && (
        <Shuffle
          onNext={() => setCurrentPage("fortune")}
          onBack={() => setCurrentPage("story")}
        />
      )}
      {startReading && !loadingReading && (
        <Fortune
          onNext={() => setCurrentPage("share")}
          onBack={() => setCurrentPage("shuffle")}
          cardContents={cardContents}
        />
      )}
    </div>
  );
};

export default Play;
