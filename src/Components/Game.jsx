"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";

const Game = ({ roomCode, isHost, onBack }) => {
  const [choice, setChoice] = useState("");
  const [rC, setRC] = useState(roomCode);
  const [playerName, setPlayerName] = useState("Player");
  const [oppName, setOppName] = useState("Opponent");
  const [opponentChoice, setOpponentChoice] = useState("");
  const [result, setResult] = useState("");
  const [socket, setSocket] = useState(null);
  const [playerMoves, setPlayerMoves] = useState([]);
  const [opponentMoves, setOpponentMoves] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(`Connected with id: ${newSocket.id}`);
      if (isHost) {
        newSocket.emit("createRoomCode");
      } else {
        newSocket.emit("joinRoom", roomCode);
      }
    });

    newSocket.on("roomCreated", ({ roomCode }) => {
      console.log(`Room created with code: ${roomCode}`);
      setRC(roomCode);
    });

    newSocket.on("roomJoined", () => {
      console.log("Successfully joined the room");
    });

    newSocket.on("roomError", (message) => {
      setErrorMessage(message);
    });

    newSocket.on("gameStart", () => {
      console.log("Game started!");
    });

    newSocket.on("opponentChoice", (opponentChoice) => {
      setOpponentChoice(opponentChoice);
      updateMovesHistory(choice, opponentChoice);
      determineResult(choice, opponentChoice);
    });

    newSocket.on("roundResult", (result) => {
      setResult(result);
    });

    // Cleanup on unmount
    return () => newSocket.close();
  }, [choice, isHost, roomCode]);

  const makeChoice = (playerChoice) => {
    setChoice(playerChoice);
    if (socket) {
      socket.emit("makeChoice", { roomCode, choice: playerChoice });
    }
  };

  const updateMovesHistory = (playerMove, opponentMove) => {
    setPlayerMoves((prev) => [...prev, playerMove].slice(-5));
    setOpponentMoves((prev) => [...prev, opponentMove].slice(-5));
  };

  const determineResult = (choice1, choice2) => {
    let result = "";
    if (choice1 === "cooperate" && choice2 === "cooperate") {
      result = "Both players cooperated. Each gets 3 points.";
    } else if (choice1 === "cooperate" && choice2 === "defect") {
      result =
        "You cooperated, but your opponent defected. You get 0 points, opponent gets 5 points.";
    } else if (choice1 === "defect" && choice2 === "cooperate") {
      result =
        "You defected, but your opponent cooperated. You get 5 points, opponent gets 0 points.";
    } else {
      result = "Both players defected. Each gets 1 point.";
    }
    setResult(result);
  };

  return (
    <div className="h-dvh flex flex-col">
      <div className="h-24 bg-slate-300 flex items-center justify-center">
        <h1 className="text-4xl text-black text-center">
          Prisoner&apos;s Dilemma
        </h1>
      </div>

      <div className="room-info flex px-10 py-2 gap-32">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          onClick={onBack}
        >
          Back to Home
        </button>
        <h2 className="text-2xl mb-4">Room Code: {rC}</h2>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-center">
          <h3>{errorMessage}</h3>
        </div>
      )}

      <div className="prev-res h-24 bg-orange-300 flex flex-col items-center justify-center">
        <div className="moves flex flex-col items-center gap-2">
          <h3 className="text-xl">Player: {playerName}</h3>
          <div className="flex gap-2">
            {playerMoves.map((move, index) => (
              <div
                key={index}
                className="move w-12 h-12 flex items-center justify-center bg-blue-200 rounded"
              >
                {move}
              </div>
            ))}
          </div>
          <h3 className="text-xl">Opponent: {oppName}</h3>
          <div className="flex gap-2">
            {opponentMoves.map((move, index) => (
              <div
                key={index}
                className="move w-12 h-12 flex items-center justify-center bg-red-200 rounded"
              >
                {move}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-grow flex bg-red-200 h-full">
        <div
          className="opponent bg-green-300 w-1/2"
          style={{ backgroundColor: "#F8B0E5" }}
        ></div>
        <div
          className="player bg-blue-200 w-1/2 flex flex-col justify-end items-center"
          style={{ backgroundColor: "#A1F2EF" }}
        >
          <div className="buttons mb-32 flex gap-10">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 m-2 w-40"
              onClick={() => makeChoice("cooperate")}
            >
              Cooperate
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 m-2 w-40"
              onClick={() => makeChoice("defect")}
            >
              Defect
            </button>
          </div>
        </div>
      </div>
      {result && (
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">{result}</h3>
        </div>
      )}
    </div>
  );
};

export default Game;
