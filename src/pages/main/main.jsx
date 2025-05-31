import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigator from "../../components/navigator";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

function Main() {
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPinned = JSON.parse(localStorage.getItem("pinnedNotes")) || [];
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setPinnedNotes(storedPinned);
    setNotes(storedNotes);
  }, []);

  const handleNoteClick = (noteID) => {
    navigate(`/edit/${noteID}`);
  };

  return (
    <div className="flex flex-col justify-center bg-light-grey h-screen max-w-md mx-auto relative pb-16">
      {/* اگر هیچ نوتی نبود */}
      {pinnedNotes.length === 0 && notes.length === 0 ? (
        <>
          <img
            className="mb-6 leading-10 font-bold h-60"
            src="Illustration(2).svg"
            alt="main-pic"
          />
          <h1 className="text-center text-4xl mb-4 font-bold">
            Start Your Journey
          </h1>
          <p className="text-center text-slate-500">
            Every big step starts with a small step.
            <br />
            Note your first idea and start
            <br />
            your journey!
          </p>
          <img className="mt-5 h-20 w-full" src="Arrow.svg" alt="down" />
        </>
      ) : (
        <>
          {/* pinnedNotes */}
          {pinnedNotes.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-4 px-2 mt-4">
                <p className="text-lg font-semibold">Pinned Notes</p>
                <a href="">View all</a>
              </div>

              <Swiper
                slidesPerView={2}
                spaceBetween={16}
                freeMode={true}
                pagination={{ clickable: true }}
                modules={[FreeMode, Pagination]}
                className="mySwiper max-w-full px-2"
                style={{ paddingBottom: "40px" }}
              >
                {pinnedNotes.map((note) => (
                  <SwiperSlide key={note.id} className="!w-auto">
                    <div
                      style={{
                        backgroundColor: note.backgroundColor || "#fff",
                      }}
                      className="flex flex-col justify-between p-4 rounded-lg shadow-md border border-slate-200 h-52 w-48 cursor-pointer"
                      onClick={() => handleNoteClick(note.id)}
                    >
                      <div>
                        <h1 className="text-lg font-bold text-slate-800 mb-2 truncate">
                          {note.title}
                        </h1>
                        <p className="text-sm text-slate-600 line-clamp-3 break-words overflow-hidden">
                          {note.content}
                        </p>
                      </div>
                      <p className="text-xs text-right text-slate-400 mt-2">
                        {note.timestamp}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}

          {/*  notes */}
          {notes.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-4 px-2 mt-4">
                <p className="text-lg font-semibold">Latest</p>
                <a href="#" className="text-sm text-purple-600">
                  View all
                </a>
              </div>

              <Swiper
                slidesPerView={2}
                spaceBetween={16}
                freeMode={true}
                pagination={{ clickable: true }}
                modules={[FreeMode, Pagination]}
                className="mySwiper max-w-full px-2"
                style={{ paddingBottom: "40px" }}
              >
                {notes.map((note) => (
                  <SwiperSlide key={note.id} className="!w-auto">
                    <div
                      style={{
                        backgroundColor: note.backgroundColor || "#fff",
                      }}
                      className="flex flex-col justify-between p-4 rounded-lg shadow-md border border-slate-200 h-52 w-48 cursor-pointer"
                      onClick={() => handleNoteClick(note.id)}
                    >
                      <div>
                        <h1 className="text-lg font-bold text-slate-800 mb-2 truncate">
                          {note.title}
                        </h1>
                        <p className="text-sm text-slate-600 line-clamp-3 break-words overflow-hidden">
                          {note.content}
                        </p>
                      </div>
                      <p className="text-xs text-right text-slate-400 mt-2">
                        {note.timestamp}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </>
      )}

      <Navigator className="fixed bottom-0 left-0 w-full" />
    </div>
  );
}

export default Main;
