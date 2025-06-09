import React, { useState, useEffect } from "react";
import Backbtn from "../../components/button/backbtn";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import MyModal from "../../components/modal/customizenotemoda;/modal";

function EditNote() {
  const { noteID } = useParams();
  const navigate = useNavigate();
  const location = useLocation()

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

  function backHandler() {
    if (location.key !== "default") {
      navigate(-1)
    } else {
      navigate("/")
    }
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
        <Backbtn className="absolute top-0 bottom-0 font-InterMedium text-purple-color-app" onClick={backHandler}>Back</Backbtn>
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
      <div className="flex items-center justify-between border-t absolute bottom-0 left-0 w-full h-12 px-4 bg-white">
        <p className="text-sm text-gray-600">
          Last edited: {new Date().toLocaleTimeString()}
        </p>

        <div className="flex items-center space-x-2">
          <button
            className="flex items-center justify-center h-10 w-10 rounded hover:bg-gray-200"
            onClick={handleSave}
            title="Save Note"
          >
            <img src="/bookmark.svg" alt="Save" />
          </button>

          <button
            onClick={toggleModal}
            className="flex items-center justify-center h-10 w-10 rounded bg-purple-600 hover:bg-purple-700"
            title="Customize"
          >
            <img src="/dots-horizontal.svg" alt="Customize" />
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
