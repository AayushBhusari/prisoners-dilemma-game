"use client";

import Link from "next/link";
import { useEffect } from "react";
import io from "socket.io-client";

const Page = () => {
  useEffect(() => {
    const socket = io("http://localhost:3000");

    // Handle connection event
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);

      // Send data to server
      socket.emit("message", "Hello from client");
      socket.emit("id", socket.id);
    });
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-1/3 flex flex-col justify-around">
        <h1 className="text-4xl font-bold mb-4 text-center text-black">
          Prisoner&apos;s Dilemma
        </h1>
        <div className="flex justify-around">
          <Link href="/host">
            <button
              id="host-btn"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Host Game
            </button>
          </Link>
          <Link href="/join">
            <button
              id="join-btn"
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Join Game
            </button>
          </Link>
          <Link href="/random">
            <button
              id="random-btn"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Random Game
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
