import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import NoteState from "../context/notes/NoteState";

const Layout = () => {
  return (
    <>
      <NoteState>
        <Navbar />
        <Home />
      </NoteState>
    </>
  );
};

export default Layout;
