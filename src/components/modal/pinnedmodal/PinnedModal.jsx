import React from "react";
import CloseIcon from '@mui/icons-material/Close';

export default function PinnedModal({ isPinnedModalOpen, togglePinnedModal }) {
  if (!isPinnedModalOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"
        onClick={togglePinnedModal}
      ></div>

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 max-w-lg mx-auto w-full flex items-end" onClick={togglePinnedModal}>
        <div
          className="modal-content bg-white p-5 rounded-t-lg shadow-lg w-full flex flex-col items-center relative"
          onClick={(e) => e.stopPropagation()} // جلوگیری از بسته‌شدن هنگام کلیک داخل مدال
        >
          {/* Close button (X) */}
          <button
            onClick={togglePinnedModal}
            className="flex justify-center items-center absolute right-5 top-5 bg-slate-200 rounded-full p-1"
          >
            <CloseIcon className="text-dark-grey" style={{width: "16px", height:"16px"}} />
          </button>

          <img
            src="/Illustration(3).svg"
            alt="Success"
            className="mb-4 w-32 h-32"
          />
          <p className="text-xl text-[#180E25] font-InterBold mb-2">Notes Pinned Successfully</p>
          <span className="mb-4 text-[#827D89]">
            This note already displayed on pinned section
          </span>

          {/* Close button */}
          <button
            onClick={togglePinnedModal}
            className="bg-purple-color-app text-white px-4 py-2 rounded-full"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
