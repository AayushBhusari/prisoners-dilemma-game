"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";

const Page = () => {
  const [roomCode, setRoomCode] = useState("");

  useEffect(() => {
    console.log(socket.id);

    // Emit the createRoomCode event
    socket.emit("createRoomCode");

    // Listen for the roomCreated event
    socket.on("roomCreated", ({ roomCode }) => {
      setRoomCode(roomCode);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-1/3 flex flex-col justify-around">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Prisoner&apos;s Dilemma
        </h1>
        <div className="flex justify-around flex-col gap-5">
          <h2 className="text-2xl text-center">
            Room Code: <span id="code-disp">{roomCode}</span>
          </h2>
          <h3 className="text-xl text-center">
            Waiting for other player to join...
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Page;
