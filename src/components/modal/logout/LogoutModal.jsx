import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteImageFromIndexedDB } from "../../../utils/IndexedDB";

export default function LogoutModal({ isOpen, onClose }) {

    const navigate = useNavigate()
  if (!isOpen) return null;
  
  const handleLogout = async () => {
  localStorage.clear();

  try {
    await deleteImageFromIndexedDB();
    console.log("Image deleted from IndexedDB");
  } catch (err) {
    console.error(err);
  }

  navigate("/login", { replace: true} );
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white px-6 py-8 rounded-2xl w-72 shadow-xl">
        <h1 className="font-InterBold text-center">Log Out</h1>
        <h2 className="font-InterMedium mt-2 mb-12 text-dark-grey text-base text-center">Are you sure you want to log out from the application?</h2>
        <div className="flex justify-between gap-2">
            <span className="flex justify-center items-center w-1/2 rounded-full text-white bg-purple-color-app py-2 px-4" onClick={handleLogout}>Yes</span>
            <span className="flex justify-center items-center rounded-full border-2 border-purple-color-app text-purple-color-app w-1/2 py-2 px-4" onClick={onClose}>Cancel</span>
        </div>
      </div>
    </div>
  );
}
