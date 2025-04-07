import React, { useEffect, useState } from "react";
import note_context from "./noteContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, set_notes] = useState([]);
  const [trigger_useEffect, set_trigger_useEffect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth-token") && localStorage.getItem("user")) {
      const fetchallnotes = async () => {
        try {
          const response = await fetch(
            `${host}/api/notes_route/fetchallnotes`,
            {
              method: "GET",
              // mode: "no-cors", // This bypasses CORS
              headers: {
                "Content-Type": "application/json",
                "auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmMGEzZWY5MGY1MTkyYmM5ZWNmOGQ0In0sImlhdCI6MTc0MzgyNTQ5MX0.wzb0X25utHz-ZoNvMeCdyR0uh6N69BkizLC8aqPQMMA",
                // "auth-token": localStorage.getItem("auth-token"),
              },
            }
          );
          const json = await response.json();
          set_notes(json);
        } catch (error) {
          console.error("Error fetching notes:", error.message);
        }
      };
      // Call the async function
      fetchallnotes();

      // Optional cleanup function (if needed)
      return () => {
        //   console.log("Cleanup if necessary");
      };
    } else {
      navigate("/login");
    }
  }, [trigger_useEffect]);
  // const [state, set_state] = useState(data);
  // const update = ()=>{
  //     setTimeout(() => {
  //         set_state({
  //             "name":"Harry",
  //             "class": 12
  //         })
  //     }, 2000);
  // }

  // add note method........
  const add_note = async (title, description, username) => {
    const response = await fetch(`${host}/api/notes_route/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmMGEzZWY5MGY1MTkyYmM5ZWNmOGQ0In0sImlhdCI6MTc0MzgyNTQ5MX0.wzb0X25utHz-ZoNvMeCdyR0uh6N69BkizLC8aqPQMMA",
        // "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, username}),
    });
    const json = await response.json();
    let note = {
      id: json._id,
      title: json.title,
      description: json.description,
    };
    // set_notes(notes.push(note));
    set_notes(notes.concat(note));
    set_trigger_useEffect(!trigger_useEffect);
  };

  // delete note method........
  const delete_note = async (id) => {
    await fetch(`${host}/api/notes_route/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmMGEzZWY5MGY1MTkyYmM5ZWNmOGQ0In0sImlhdCI6MTc0MzgyNTQ5MX0.wzb0X25utHz-ZoNvMeCdyR0uh6N69BkizLC8aqPQMMA",
        // "auth-token": localStorage.getItem("auth-token"),
      },
    });
    /*
    const response = await fetch(`${host}/api/notes_route/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmMGEzZWY5MGY1MTkyYmM5ZWNmOGQ0In0sImlhdCI6MTc0MzgyNTQ5MX0.wzb0X25utHz-ZoNvMeCdyR0uh6N69BkizLC8aqPQMMA",
        // "auth-token": localStorage.getItem("auth-tocken")
      },
    });
    const json = await response.json();
    const new_note = notes.filter((note) => {
      return note._id !== id;
    });
    set_notes(new_note);
    */
    set_trigger_useEffect(!trigger_useEffect);
  };

  // edit note method.......
  const edit_note = async (id, title, description) => {
    await fetch(`${host}/api/notes_route/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmMGEzZWY5MGY1MTkyYmM5ZWNmOGQ0In0sImlhdCI6MTc0MzgyNTQ5MX0.wzb0X25utHz-ZoNvMeCdyR0uh6N69BkizLC8aqPQMMA",
        // "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description }),
    });
    // for (let index = 0; index < notes.length; index++) {
    //     const element = notes[index];
    //     if(element._id===id){
    //         element.title = title;
    //         element.description = description;
    //     }
    // }
    /*
    const response = await fetch(`${host}/api/notes_route/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmMGEzZWY5MGY1MTkyYmM5ZWNmOGQ0In0sImlhdCI6MTc0MzgyNTQ5MX0.wzb0X25utHz-ZoNvMeCdyR0uh6N69BkizLC8aqPQMMA",
        // "auth-token": localStorage.getItem("auth-tocken")
      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    const updated_notes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title, description }; // Return updated note
      }
      return note; // Return unchanged note
    });
    set_notes(updated_notes); // Update state with new array
    */
    set_trigger_useEffect(!trigger_useEffect);
  };

  return (
    //making props.childrens become available for all components that wraps inside NoteState component....
    <note_context.Provider
      value={{ notes, set_notes, add_note, delete_note, edit_note }}
    >
      {props.children}
    </note_context.Provider>
  );
};

export default NoteState;
