import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center justify-center">
        {/* Loader animation */}
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-24 w-24 animate-spin"></div>
      </div>
      <h2 className="text-2xl font-semibold mt-4 text-gray-700">
        Connecting to the server...
      </h2>
    </div>
  );
};

export default Loading;
