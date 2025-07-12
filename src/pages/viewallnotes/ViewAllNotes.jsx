import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigator from "../../components/navigator";

export default function ViewAllNotes() {
  const location = useLocation();
  const noteType = location.state?.noteType || "latest";
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate()
  const handleNoteClick = (noteID) => {
    navigate(`/edit/${noteID}`)
  }
  

  useEffect(() => {
    const pinnedNotes = JSON.parse(localStorage.getItem("pinnedNotes")) || [];
    const allNotes = JSON.parse(localStorage.getItem("notes")) || [];

    setNotes(noteType === "pinned" ? pinnedNotes : allNotes);
    
  }, [noteType]);

  return (
    <div className="h-screen max-w-md mx-auto relative">
      <div className="flex justify-between min-h-[160px] bg-purple-color-app px-4">
        <span className="text-white mt-6 text-xl">All Notes</span>
        <img src="/images/illustration(4).svg" alt="" />
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 rounded-lg shadow-md border border-slate-200 h-52 cursor-pointer"
            style={{ backgroundColor: note.backgroundColor || "#fff" }}
            onClick={() => handleNoteClick(note.id)}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="text-custome-black">
                <h1 className="text-sm font-InterMedium mb-2 truncate">
                  {note.title}
                </h1>
                <p className="text-xs line-clamp-3 break-words overflow-hidden">
                  {note.content}
                </p>
              </div>
              <p className="text-xs text-right text-dark-grey mt-2">
                {note.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Navigator className="sticky bottom-0 left-0 w-full" />
    </div>
  );
}
