import React from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../../components/button/btn";
import Backbtn from "../../components/button/backbtn";
import { useState, useEffect } from "react";
import TextSizeModal from "../../components/modal/textSizeModal/TextSizeModal";
import Navigator from "../../components/navigator";
import { getImageFromIndexedDB } from "../../utils/IndexedDB";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


function Settings() {
  const [showModal, setShowModal] = useState(false);
  const [textSize, setTextSize] = useState(
    localStorage.getItem("preferredTextSize") || "medium"
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fullName = localStorage.getItem("userFullName") || "";
    const email = localStorage.getItem("userEmail") || "";
    setFullName(fullName);
    setEmail(email);

    getImageFromIndexedDB().then((blob) => {
      if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        setProfilePic(imageUrl);
      }
    });
  }, []);

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
          <p className="text-purple-color-app font-InterMedium">Back</p>
        </Backbtn>
        <p className="absolute left-1/2 transform -translate-x-1/2 text-center font-InterMedium pointer-events-none">
          Settings
        </p>
      </div>

      <div className="px-4">
        <div className="border-b border-light-grey pb-6 mb-6">
          <div className="flex items-center mt-6">
            {profilePic ? (
              <img
              src={profilePic || "Profile Picture.png"}
              alt="profile"
              className="w-16 h-16 object-cover rounded-full"
            />
            ) : (
              <AccountCircleOutlinedIcon style={{ fontSize: 64, color: '#9ca3af' }} />
            )}
            <div className="ml-6">
              <span className="flex flex-wrap text">{fullName}</span>
              <div className="flex items-center flex-wrap">
                <img src="icon.svg" alt="email-icon" />
                <p className="text-xs">{email}</p>
              </div>
            </div>
          </div>
          <Btn
            className="flex items-center justify-center bg-white border-2 border-purple-color-app h-[38px]"
            onClick={EditNavigate}
          >
            <img src="pencil-alt.svg" alt="edit-svg" />
            <p className="text-purple-color-app ml-2 font-InterMedium">Edit Profile</p>
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
            <span className="font-InterMedium">Text Size</span>
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

      <Navigator className="fixed bottom-0 left-0 w-full" />
    </div>
  );
}

export default Settings;
