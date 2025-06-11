import React, { useEffect, useState } from "react";
import Navigator from "../../components/navigator";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const location = useLocation()
  const navigat = useNavigate()
  function backHandler() {
    location.key !== "default" ? navigat(-1) : navigat("/")
  }

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const pinnedNotes = JSON.parse(localStorage.getItem("pinnedNotes")) || [];
    setAllNotes([...pinnedNotes, ...notes]);
  }, []);

  useEffect(() => {
    const results = allNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(results);
  }, [query, allNotes]);

  return (
    <div className="h-screen max-w-md mx-auto relative">
      <div className="px-4">
        <div className="flex items-center pt-6">
        <ArrowBackIosOutlinedIcon className="mr-3 cursor-pointer" style={{width:"20px", height:"20px"}} onClick={backHandler} />
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-md h-9 bg-[#EFEEF0] p-4 w-full outline-none focus:ring-0"
        />
      </div>

      {/* نتایج جستجو */}
      {query ? (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              style={{ backgroundColor: note.backgroundColor || "#fff" }}
              className="p-4 rounded-lg shadow-md text-custome-black border border-slate-200 h-48"
            >
              <h1 className="text-sm font-InterMedium mb-2 truncate">
                {note.title}
              </h1>
              <p className="text-xs line-clamp-4">
                {note.content}
              </p>
            </div>
          ))}
          {query && filteredNotes.length === 0 && (
            <p className="col-span-2 text-center text-sm text-slate-400 mt-8">
              No results found.
            </p>
          )}
        </div>
      ) : (
        <></>
      )}
      </div>

      <Navigator className="absolute bottom-0 w-full" />
    </div>
  );
}

export default Search;
