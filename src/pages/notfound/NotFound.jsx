import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-purple-color-app">404!</h1>
      <p className="text-xl mt-4">Not Found!</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-purple-color-app text-white rounded"
      >
        Back
      </Link>
    </div>
  );
}
