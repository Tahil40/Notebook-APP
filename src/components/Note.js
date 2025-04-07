import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import note_context from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

export default function Note() {
  const notes_variable = useContext(note_context);
  const { notes, set_notes, edit_note } = notes_variable;
  const [updateNote, setupdateNote] = useState({
    id: "",
    title: "",
    description: "",
  });

  const ref = useRef(null); // Ref for the modal element
  const modalInstance = useRef(null); // Ref for the Bootstrap modal instance

  useEffect(() => {
    // Initialize the modal instance once
    if (ref.current) {
      modalInstance.current = new window.bootstrap.Modal(ref.current, {
        backdrop: "static", // Optional: Customize behavior
        keyboard: true, // Optional: Allow closing with the Escape key
      });
    }
    set_notes();
  }, [set_notes]);

  const update_note = (current_note) => {
    // ref.toggle();
    // Show the modal
    if (modalInstance.current) {
      modalInstance.current.show();
    }
    setupdateNote({
      id: current_note._id,
      title: current_note.title,
      description: current_note.description,
    });
  };

  const onchange = (e) => {
    setupdateNote({ ...updateNote, [e.target.name]: e.target.value });
  };

  const handleSaveNotes = (e) => {
    // e.preventDefault();
    edit_note(updateNote.id, updateNote.title, updateNote.description);
    // Hide the modal after saving
    if (modalInstance.current) {
      modalInstance.current.hide();
    }
  };

  return (
    <>
      {/* Adding modal....... */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={ref}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    onChange={onchange}
                    value={updateNote.title}
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
                    value={updateNote.description}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveNotes}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Adding notes.......... */}
      <div className="row mx-4">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note, index) => {
            return <NoteItem key={index} note={note} edit_note={update_note} />;
          })
        ) : (
          <p>No Notes Available Create Your Notes</p>
        )}
      </div>
    </>
  );
}
