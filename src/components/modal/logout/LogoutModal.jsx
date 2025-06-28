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
      <div className="bg-white p-4 rounded-lg w-72 shadow-xl">
        <h2 className="font-InterMedium mt-2 mb-6">Are you sure you want to logout?</h2>
        <div className="flex justify-between gap-2">
            <span className="flex justify-center items-center w-1/2 rounded-md text-white bg-purple-color-app h-8" onClick={handleLogout}>Yes</span>
            <span className="flex justify-center items-center rounded-md border-2 border-purple-color-app text-purple-color-app w-1/2 h-8" onClick={onClose}>No</span>
        </div>
      </div>
    </div>
  );
}
