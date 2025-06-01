import React, { useEffect, useRef, useState } from "react";
import Backbtn from "../../components/button/backbtn";
import Btn from "../../components/button/btn";
import { useNavigate } from "react-router-dom";
import { saveImageToIndexedDB, getImageFromIndexedDB } from "./../../utils/IndexedDB"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // state‌ها
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("User");
  const [email, setEmail] = useState("Email");
  const [mobile, setMobile] = useState("");

  // گرفتن مقادیر از localStorage هنگام بارگذاری
  useEffect(() => {
  const fullName = localStorage.getItem("userFullName") || "";
  const mobile = localStorage.getItem("userMobile") || "";
  const email = localStorage.getItem("userEmail") || "";
  setFullName(fullName);
  setEmail(email)
  setMobile(mobile);

  getImageFromIndexedDB().then(blob => {
    if (blob) {
      const imageUrl = URL.createObjectURL(blob);
      setProfilePic(imageUrl);
    }
  });
}, []);

  // تغییر عکس
  const [selectedImageFile, setSelectedImageFile] = useState(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setProfilePic(imageUrl);
  }
};

  // کلیک روی ویرایش عکس
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // ذخیره اطلاعات
  const saveUserEditInfos = () => {
  localStorage.setItem("userFullName", fullName);
  localStorage.setItem("userMobile", mobile);
  localStorage.setItem("userEmail", email)

  if (selectedImageFile) {
    saveImageToIndexedDB(selectedImageFile)
      .then(() => navigate("/settings"))
      .catch(err => console.error("Failed to save image:", err));
  } else {
    navigate("/settings");
  }
};

  // بازگشت
  const ClickHandler = () => {
    navigate("/settings");
  };

  return (
    <div className="flex flex-col justify-between h-screen max-w-md mx-auto relative">
      <div>
        {/* Header */}
        <div className="relative h-12 border-b px-4 flex items-center">
          <Backbtn onClick={ClickHandler} className="z-10">
            <p className="text-purple-color-app font-bold">Back</p>
          </Backbtn>
          <p className="absolute left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
            Edit Profile
          </p>
        </div>

        <div className="px-4">
          {/* Profile Image */}
          <div className="flex flex-col items-center mt-6 border-b pb-6">
            {profilePic ? (
              <img
              src={profilePic} // عکس پیش‌فرض
              alt="Profile"
              className="h-[120px] w-[120px] object-cover rounded-full"
            />
            ) : (
              <AccountCircleOutlinedIcon style={{ fontSize: 64, color: '#9ca3af' }} />
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            <Btn
              className="flex items-center justify-center bg-white border-2 border-purple-color-app w-44 mt-2"
              onClick={handleClick}
            >
              <img src="pencil-alt.svg" alt="edit" />
              <p className="text-purple-color-app ml-2">Edit Image</p>
            </Btn>
          </div>

          {/* Full Name */}
          <div className="mt-6">
            <p className="mb-3">Full Name</p>
            <input
              type="text"
              placeholder="Your Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-[#C8C5CB] rounded-md p-4 w-full"
            />
          </div>

          {/* Email */}
          <div className="mt-8">
            <p className="mb-3">Email</p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#C8C5CB] rounded-md p-4 w-full"
            />
          </div>

          {/* Mobile */}
          <div className="mt-8">
            <p className="mb-3">Mobile</p>
            <input
              type="text"
              placeholder="Phone Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="border border-[#C8C5CB] rounded-md p-4 w-full"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="px-4">
        <Btn onClick={saveUserEditInfos} className="w-full bg-purple-color-app mb-8">
          <span className="text-white">Save Changes</span>
        </Btn>
      </div>
    </div>
  );
}

export default Profile;
