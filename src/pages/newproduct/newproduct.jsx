import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import MyModal from "../../components/modal/customizenotemoda;/modal";
import Backbtn from "../../components/button/backbtn";
import PinnedModal from "../../components/modal/pinnedmodal/PinnedModal";
import { v4 as uuidv4 } from "uuid";

function Newnote() {
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [title, setTitle] = useState(""); // ⬅️ عنوان یادداشت
  const [content, setContent] = useState(""); // ⬅️ محتوای یادداشت
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [isPinnedModalopen, setPinnedModalOpen] = useState(false);

  const preferredSize = localStorage.getItem("preferredTextSize") || "medium";

  const sizeClass = {
    base: "text-base", // 16px
    medium: "text-lg", // 18px
    bold: "text-xl", // 22px
  }[preferredSize];

  const toggleModal = () => setIsCustomizeModalOpen(!isCustomizeModalOpen);
  const navigate = useNavigate();

  function NavigateHandler() {
    navigate("/");
  }

  // ⬇️ تابع ذخیره‌سازی
  function handleConfirm() {
    const newNote = {
      id: uuidv4(),
      title,
      content,
      timestamp: new Date().toLocaleString(),
      backgroundColor,
    };

    const pinnedNotes = JSON.parse(localStorage.getItem("pinnedNotes")) || [];
    pinnedNotes.push(newNote);
    localStorage.setItem("pinnedNotes", JSON.stringify(pinnedNotes));

    setPinnedModalOpen(true); // فقط مدال رو باز می‌کنیم
    setTitle("");
    setContent("");
  }

  return (
    <div
      className={`h-screen max-w-md mx-auto relative main-content ${
        isCustomizeModalOpen ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* دکمه‌ی تایید */}
      <button
        className="absolute right-4 bottom-20 bg-purple-500 text-white px-4 py-2 rounded"
        onClick={() => {
          const newNote = {
            id: uuidv4(),
            title,
            content,
            timestamp: new Date().toLocaleString(),
            backgroundColor,
          };

          const notes = JSON.parse(localStorage.getItem("notes")) || [];
          notes.push(newNote);
          localStorage.setItem("notes", JSON.stringify(notes));

          setTitle("");
          setContent("");
          navigate("/");
        }}
      >
        Confirm
      </button>

      <div className="flex justify-start border-b h-12 px-4 mb-6">
        <Backbtn onClick={NavigateHandler}>
          <p className="text-purple-color-app font-bold">Back</p>
        </Backbtn>
      </div>
      <input
        className="text-4xl font-bold pr-10 leading-10 mb-4 px-4 h-20 w-full"
        type="text"
        placeholder="💡 New Product Ideas"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={`text-slate-500 px-4 w-full min-h-48 ${sizeClass}`}
        placeholder={`Create a mobile app UI Kit that provides a basic notes functionality but with some improvement. There will be a choice to select what kind of notes the user needs, so the experience while taking notes can be unique based on the needs.`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex items-center justify-between border-t absolute bottom-0 w-full h-12 pl-4">
        <p>Last edited: {new Date().toLocaleTimeString()}</p>
        <div className="flex items-center">
          <button
            className="flex items-center justify-center h-12 w-12"
            onClick={handleConfirm}
          >
            <img src="bookmark.svg" alt="Toggle Modal" />
          </button>
          <button
            onClick={toggleModal}
            className="flex items-center justify-center bg-purple-color-app h-12 w-12"
          >
            <img src="dots-horizontal.svg" alt="Toggle Modal" />
          </button>
        </div>
      </div>

      {/* مودال */}
      {isCustomizeModalOpen &&
        ReactDOM.createPortal(
          <MyModal
            className="absolute top-25"
            isCustomizeModalOpen={isCustomizeModalOpen}
            toggleModal={toggleModal}
            onColorSelect={(color) => {
              setBackgroundColor(color);
              toggleModal();
            }}
          />,
          document.body
        )}
        
      {isPinnedModalopen && 
        ReactDOM.createPortal(
          <PinnedModal
            isPinnedModalOpen={isPinnedModalopen}
            togglePinnedModal={() => {
              setPinnedModalOpen(false);
              navigate("/");
            }}
          />,
          document.body
        )}
    </div>
  );
}

export default Newnote;
