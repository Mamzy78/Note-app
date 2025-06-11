import React, { useState, useEffect } from "react";
import Backbtn from "../../components/button/backbtn";
import { useParams, useNavigate } from "react-router-dom";
import MyModal from "../../components/modal/customizenotemoda;/modal";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CheckIcon from "@mui/icons-material/Check";

function EditNote() {
  const { noteID } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [noteSource, setNoteSource] = useState("notes");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);

  useEffect(() => {
    const pinnedNotes = JSON.parse(localStorage.getItem("pinnedNotes")) || [];
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    const allNotes = [...pinnedNotes, ...notes];
    const currentNote = allNotes.find((n) => n.id === noteID);

    if (currentNote) {
      setNote(currentNote);
      setTitle(currentNote.title);
      setContent(currentNote.content);
      setBackgroundColor(currentNote.backgroundColor || "#ffffff");

      // مشخص کن نوت از کدوم لیست بوده
      setNoteSource(
        pinnedNotes.some((n) => n.id === noteID) ? "pinnedNotes" : "notes"
      );
    } else {
      navigate("/");
    }
  }, [noteID, navigate]);

  function togglePinStatus() {
    const pinnedNotes = JSON.parse(localStorage.getItem("pinnedNotes")) || [];
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    const currentNote = {
      id: noteID,
      title,
      content,
      backgroundColor,
      timestamp: new Date().toLocaleString(),
    };

    if (noteSource === "pinnedNotes") {
      // انتقال از pinned به notes
      const updatedPinned = pinnedNotes.filter((n) => n.id !== noteID);
      const updatedNotes = [...notes, currentNote];
      localStorage.setItem("pinnedNotes", JSON.stringify(updatedPinned));
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNoteSource("notes");
    } else {
      // انتقال از notes به pinned
      const updatedNotes = notes.filter((n) => n.id !== noteID);
      const updatedPinned = [...pinnedNotes, currentNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      localStorage.setItem("pinnedNotes", JSON.stringify(updatedPinned));
      setNoteSource("pinnedNotes");
    }
  }

  function handleSave() {
    const notesFromStorage = JSON.parse(localStorage.getItem(noteSource)) || [];
    const updatedNotes = notesFromStorage.map((n) =>
      n.id === noteID
        ? {
            ...n,
            title,
            content,
            backgroundColor,
            timestamp: new Date().toLocaleString(),
          }
        : n
    );
    localStorage.setItem(noteSource, JSON.stringify(updatedNotes));
    navigate("/");
  }

  function toggleModal() {
    setIsCustomizeModalOpen(!isCustomizeModalOpen);
  }

  function handleColorSelect(color) {
    setBackgroundColor(color);
  }

  if (!note) return null;

  function handleDelete() {
    const notesFromStorage = JSON.parse(localStorage.getItem(noteSource)) || [];
    const updatedNotes = notesFromStorage.filter((n) => n.id !== noteID);
    localStorage.setItem(noteSource, JSON.stringify(updatedNotes));
    navigate("/");
  }

  return (
    <div
      className="relative max-w-md mx-auto p-4 min-h-screen"
      style={{ backgroundColor }}
    >
      <div className="relative">
        <h1 className="text-center text-2xl font-bold mb-4">Edit Note</h1>
        <Backbtn className="absolute top-0 bottom-0 font-InterMedium text-purple-color-app">
          Back
        </Backbtn>
      </div>

      <input
        className="border p-2 mb-4 w-full rounded"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        className="border p-2 mb-4 w-full h-40 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />

      {/* نوار پایین ثابت */}
      <div className="flex items-center justify-between border-t absolute bottom-0 left-0 w-full h-12 pl-4 bg-white">
        <p className="text-sm text-gray-600">
          Last edited: {new Date().toLocaleTimeString()}
        </p>

        <div className="flex items-center space-x-2">
          {title && content && (
            <>
              <button
                className="flex items-center justify-center h-12 w-10"
                onClick={togglePinStatus}
                title={noteSource === "pinnedNotes" ? "Unpin" : "Pin"}
              >
                {noteSource === "pinnedNotes" ? (
                  <BookmarkIcon />
                ) : (
                  <BookmarkBorderOutlinedIcon />
                )}
              </button>

              <button
                className="flex justify-center items-center h-12 w-12 bg-purple-color-app hover:bg-purple-700"
                onClick={handleSave}
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

      <MyModal
        isCustomizeModalOpen={isCustomizeModalOpen}
        toggleModal={toggleModal}
        onColorSelect={handleColorSelect}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default EditNote;
