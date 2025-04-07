import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import Navbar from "./Navbar"; 
import Note from "./Note";
import note_context from "../context/notes/noteContext";

export default function Home() {
  // const a = useContext(note_context);
  const context = useContext(note_context); 
  const {add_note} = context; 
  const [trigger_useEffect, set_trigger_useEffect] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  //to trigger useEffect when add_note is called....
  useEffect(()=>{}, [trigger_useEffect]);

  const [note, set_note] = useState({title:"", description:""}); 
  const add_note_click = (e)=>{
    e.preventDefault();//to stop reloading page when submit button is clicked.... 
    add_note(note.title, note.description, user.username);
    set_note({title:"", description:""}); //to clear the input field after adding note....
    set_trigger_useEffect(!trigger_useEffect);
  }
 
  const onchange = (e)=>{
    //adding input text's value to useState note....
    set_note({...note, [e.target.name]:e.target.value});
    // set_note({[e.target.title]:e.target.title, [e.target.description]:e.target.description});
  }

  return (
    <>
      <Navbar />
      {/* <p>{a.state.name}</p>
        <p>{a.state.className}</p>
        <p>{a.update()}</p> */}

      {/* Adding form..... */}
      <div className="container_form mx-4" style={{marginTop:"55px"}}>
      <h1 className="text-center" style={{ color: "blue" }}>
        Notebook - App
      </h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name = "title"
              aria-describedby="emailHelp"
              onChange={onchange}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="textarea"
              className="form-control"
              id="description"
              name="description"
              aria-label="With textarea"
              onChange={onchange}
              value={note.description}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={add_note_click} disabled={note.title.length < 5 || note.description.length < 10}>
            Add Note
          </button>
        </form>
      </div>

      <hr className="mx-4"/>
      <br />  
      {/* Adding notes........ */}
      <Note/>
    </>
  );
}
