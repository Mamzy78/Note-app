import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Verification from "./pages/verification/verification";
import Intro from "./pages/introduction/introduction";
import Main from "./pages/main/main";
import Newproduct from "./pages/newproduct/newproduct";
import Search from "./pages/search/search";
import Settings from "./pages/settings/settings";
import Profile from "./pages/profile/profile";
import EditNote from "./pages/editnote/EditNote";
import ViewAllNotes from "./pages/viewallnotes/ViewAllNotes";
import Finished from "./pages/finished/Finished";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { phone, isVerified } = useContext(AuthContext);

  if (!phone) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (!isVerified) {
    return (
      <Routes>
        <Route path="/verification" element={<Verification />} />
        <Route path="*" element={<Navigate to="/verification" replace />} />
      </Routes>
    );
  }

  return (
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
      <Route path="/finished" element={<Finished />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
