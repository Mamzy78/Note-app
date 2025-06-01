import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './pages/login/login'
import Verification from './pages/verification/verification'
import Intro from "./pages/introduction/introduction";
import Main from "./pages/main/main"
import Newproduct from "./pages/newproduct/newproduct";
import Search from "./pages/search/search";
import Settings from "./pages/settings/settings";
import Profile from "./pages/profile/profile";
import EditNote from "./pages/editnote/EditNote";
import ViewAllNotes from "./pages/viewallnotes/ViewAllNotes";

export default function App() {
  
  
  return (
    <>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/viewallnotes" element={<ViewAllNotes />} />
          <Route path="/edit/:noteID" element={<EditNote />} />
          <Route path="/newproduct" element={<Newproduct />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
        </Routes>
    </>
  );
}
