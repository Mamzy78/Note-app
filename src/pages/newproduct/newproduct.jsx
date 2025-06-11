import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import MyModal from "../../components/modal/customizenotemoda;/modal";
import Backbtn from "../../components/button/backbtn";
import PinnedModal from "../../components/modal/pinnedmodal/PinnedModal";
import { v4 as uuidv4 } from "uuid";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CheckIcon from "@mui/icons-material/Check";

function Newnote() {
  const navigate = useNavigate();
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [isPinnedModalopen, setPinnedModalOpen] = useState(false);

  const preferredSize = localStorage.getItem("preferredTextSize") || "medium";

  const sizeClass = {
    base: "text-base", // 16px
    medium: "text-lg", // 18px
    bold: "text-xl", // 22px
  }[preferredSize];

  const toggleModal = () => setIsCustomizeModalOpen(!isCustomizeModalOpen);

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

    setPinnedModalOpen(true);
    setTitle("");
    setContent("");
  }

  const isNoteValid = title.trim() !== "" && content.trim() !== "";

  return (
    <div
      className={`h-screen max-w-md mx-auto relative main-content ${
        isCustomizeModalOpen ? "opacity-50 pointer-events-none" : ""
      }`}
    >

      <div className="flex justify-start border-b h-12 px-4 mb-6">
        <Backbtn>
          <p className="text-purple-color-app font-InterMedium">Back</p>
        </Backbtn>
      </div>
      <input
        className="text-[32px] font-InterBold pr-10 leading-10 mb-4 px-4 h-20 w-full"
        type="text"
        placeholder="💡 New Product Ideas"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={`text-dark-grey px-4 w-full min-h-48 ${sizeClass}`}
        placeholder={`Create a mobile app UI Kit that provides a basic notes functionality but with some improvement. There will be a choice to select what kind of notes the user needs, so the experience while taking notes can be unique based on the needs.`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex items-center justify-between border-t absolute bottom-0 w-full h-12 pl-4">
        <p className="text-xs">
          Last edited: {new Date().toLocaleTimeString()}
        </p>
        <div className="flex items-center space-x-2">
          {isNoteValid && (
            <>
              <button
                className="flex items-center justify-center h-12 w-10"
                onClick={handleConfirm}
              >
                <BookmarkBorderOutlinedIcon className="w-6 h-6 text-[#180E25]" />
              </button>
              <button
                className="flex justify-center items-center h-12 w-12 bg-purple-color-app hover:bg-purple-700"
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
                <CheckIcon className="text-white" />
              </button>
            </>
          )}
          <button
            onClick={toggleModal}
            className="flex items-center justify-center bg-purple-color-app h-12 w-12"
          >
            <MoreHorizOutlinedIcon className="h-6 w-6 text-white" />
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
