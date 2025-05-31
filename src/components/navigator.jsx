import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function Navigator() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="absolute bottom-0 w-full">
      <div className="flex justify-center">
        <button
          className="absolute bottom-12 p-1"
          onClick={() => navigate("/newproduct")}
        >
          <img
            className="bg-purple-color-app h-16 rounded-full"
            src="plus.svg"
            alt="#add"
          />
        </button>
      </div>
      <div className="flex justify-between items-center bg-white h-21 px-4">
        <div className="flex w-1/3 justify-between">
          <button
            className={`flex flex-col items-center ${
              currentPath === "/" ? "text-purple-color-app" : "text-dark-grey"
            }`}
            onClick={() => navigate("/")}
          >
            {currentPath === "/" ? (
              <HomeIcon style={{ width: "32px", height: "32px" }} />
            ) : (
              <HomeOutlinedIcon style={{ width: "32px", height: "32px" }} />
            )}
            <p className="text-sm">Home</p>
          </button>

          <button
            className={`flex flex-col items-center ${
              currentPath === "/finished" ? "text-purple-color-app" : "text-dark-grey"
            }`}
            onClick={() => navigate("/finished")}
          >
            {currentPath === "/finished" ? (
              <AssignmentTurnedInIcon style={{width: "32px", height: "32px"}} />
            ): (
              <AssignmentTurnedInOutlinedIcon style={{width:"32px", height: "32px"}} />
            )}
            <p className="text-sm">Finished</p>
          </button>
        </div>

        <div className="flex w-1/3 justify-between">
          <button
            className={`flex flex-col items-center ${
              currentPath === "/search" ? "text-purple-color-app" : "text-dark-grey"
            }`}
            onClick={() => navigate("/search")}
          >
            {currentPath === "/search" ? (
              <SearchIcon style={{width:"32px", height: "32px"}}/>
            ) : (
              <SearchOutlinedIcon style={{width:"32px", height: "32px"}} />
            )}
            <p className="text-sm">Search</p>
          </button>

          <button
            className={`flex flex-col items-center ${
              currentPath === "/settings" ? "text-purple-color-app" : "text-dark-grey"
            }`}
            onClick={() => navigate("/settings")}
          >
            {currentPath === "/settings" ? (
              <SettingsIcon style={{width:"32px", height: "32px"}}/>
            ) : (
              <img src="cog.svg" alt="#Settings" />
            )}
            <p className="text-sm">Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigator;
