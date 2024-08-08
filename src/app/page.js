"use client";

import { useState } from "react";
import Home from "../Components/Home";
import Game from "../Components/Game";
import { Gelasio } from "next/font/google";

const gelasio = Gelasio({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

const Page = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [roomCode, setRoomCode] = useState("");
  const [isHost, setIsHost] = useState(false);

  const handleHost = () => {
    setIsHost(true);
    setCurrentScreen("game");
  };

  const handleJoin = () => {
    const code = prompt("Enter Room Code:");
    if (code) {
      setRoomCode(code);
      setIsHost(false);
      setCurrentScreen("game");
    }
  };

  const handleRandom = () => {
    // Implement random room joining logic here
  };

  const handleBack = () => {
    setCurrentScreen("home");
  };

  return (
    <div className={gelasio.className}>
      {currentScreen === "home" ? (
        <Home onHost={handleHost} onJoin={handleJoin} onRandom={handleRandom} />
      ) : (
        <Game roomCode={roomCode} isHost={isHost} onBack={handleBack} />
      )}
    </div>
  );
};

export default Page;
