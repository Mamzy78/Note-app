import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navigator() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="absolute bottom-0 w-full">
      <div className="flex justify-center">
        <button className="absolute bottom-12 p-1" onClick={() => navigate("/newproduct")}>
          <img className="bg-purple-color-app h-16 rounded-full" src="plus.svg" alt="#add" />
        </button>
      </div>
      <div className="flex justify-between items-center bg-white h-21 px-4">
        <div className="flex w-1/3 justify-between">
          <button
            className={`flex flex-col items-center ${currentPath === "/" ? "text-purple-color-app" : ""}`}
            onClick={() => navigate("/")}
          >
            <img src="home.svg" alt="#Home" />
            <p>Home</p>
          </button>

          <button
            className={`flex flex-col items-center ${currentPath === "/finished" ? "text-purple-color-app" : ""}`}
            onClick={() => navigate("/finished")}
          >
            <img src="clipboard-check.svg" alt="#Finished" />
            <p>Finished</p>
          </button>
        </div>

        <div className="flex w-1/3 justify-between">
          <button
            className={`flex flex-col items-center ${currentPath === "/search" ? "text-purple-color-app" : ""}`}
            onClick={() => navigate("/search")}
          >
            <img src="search.svg" alt="#Search" />
            <p>Search</p>
          </button>

          <button
            className={`flex flex-col items-center ${currentPath === "/settings" ? "text-purple-color-app" : ""}`}
            onClick={() => navigate("/settings")}
          >
            <img src="cog.svg" alt="#Settings" />
            <p>Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigator;
