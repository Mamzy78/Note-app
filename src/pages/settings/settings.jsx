import React from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../../components/button/btn";
import Backbtn from "../../components/button/backbtn";
import { useState } from "react";
import TextSizeModal from "../../components/modal/textSizeModal/TextSizeModal";
import Navigator from "../../components/navigator";

function Settings() {
  const [showModal, setShowModal] = useState(false);
  const [textSize, setTextSize] = useState(
    localStorage.getItem("preferredTextSize") || "medium"
  );

  const handleSelect = (size) => {
    setTextSize(size);
    localStorage.setItem("preferredTextSize", size);
  };
  const navigate = useNavigate();

  function ClickHandler() {
    console.log("click");
    navigate("/");
  }

  function EditNavigate() {
    navigate("/profile");
  }

  return (
    <div className="h-screen max-w-md mx-auto relative">
      <div className="h-12 border-b px-4 flex items-center">
        <Backbtn onClick={ClickHandler} className="z-10">
          <p className="text-purple-color-app font-bold">Back</p>
        </Backbtn>
        <p className="absolute left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
          Settings
        </p>
      </div>

      <div className="px-4">
        <div className="border-b border-light-grey pb-6 mb-6">
          <div className="flex items-center mt-6">
            <img
              src="Profile Picture.png"
              alt="#profile"
              className="w-16 h-16"
            />
            <div className="ml-6">
              <span className="flex flex-wrap text">Michael Antonio</span>
              <div className="flex items-center flex-wrap">
                <img src="icon.svg" alt="email-icon" />
                <p className="text-xs">anto_michael@gmail.com</p>
              </div>
            </div>
          </div>
          <Btn
            className="flex items-center justify-center bg-white border-2 border-purple-color-app h-[38px]"
            onClick={EditNavigate}
          >
            <img src="pencil-alt.svg" />
            <p className="text-purple-color-app ml-2">Edit Profile</p>
          </Btn>
        </div>
      </div>

      <div className="px-4">
        <div className="mb-6">
          <span className="text-[10px] text-dark-grey">APP SETTINGS</span>
        </div>

        <a
          href="#"
          className="flex justify-between border-b border-light-grey pb-2"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          <div className="flex items-center gap-3">
            <img src="text-size.svg" alt="text-size-icon" />
            <span>Text Size</span>
          </div>
          <span className="text-dark-grey capitalize">{textSize}</span>
        </a>

        <TextSizeModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          selectedSize={textSize}
          onSelect={handleSelect}
        />

        {/* <div>
        <input type="file" />
      </div> */}

        <button className="flex items-center gap-3 mt-2">
          <img src="logout.svg" alt="#Logout" />
          <span className="text-[#CE3A54] font-InterMedium">Log Out</span>
        </button>
      </div>

      <Navigator className="fixed bottom-0 left-0 w-full"/>
    </div>
  );
}

export default Settings;
