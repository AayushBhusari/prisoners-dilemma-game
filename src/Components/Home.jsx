"use client";

import React from "react";

const Home = ({ onHost, onJoin, onRandom }) => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-4/12 h-3/5 flex flex-col">
        <h1 className="text-5xl font-extrabold mb-28 text-center text-gray-800 mt-8">
          Prisoner&apos;s Dilemma
        </h1>
        <div className="flex flex-col flex-grow justify-around items-center">
          <button
            id="host-btn"
            className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out w-72"
            onClick={onHost}
          >
            Host Game
          </button>
          <button
            id="join-btn"
            className="bg-green-600 text-white py-3 px-6 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out w-72"
            onClick={onJoin}
          >
            Join Game
          </button>
          <button
            id="random-btn"
            className="bg-yellow-500 text-white py-3 px-6 rounded-full shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out w-72"
            onClick={onRandom}
          >
            Random Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
