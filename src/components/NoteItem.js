import React,{useContext} from "react";
import note_context from "../context/notes/noteContext";

export default function NoteItem(props) {
  const {note, edit_note} = props;
  const delete_note_variable = useContext(note_context); 
  const {delete_note} = delete_note_variable;   

  return (
    <>
      <div className="col-md-3">
        <div className="card mx-6 my-2">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h4 className="card-title">{note?.title || "Untitled"}</h4>
              {/* Adding delete icon....... */}
              <i className="fa-solid fa-trash-can-arrow-up mx-4" onClick={()=> {return delete_note(note?._id)}}></i>
                 
              {/* Adding edit icon.......*/}
              <i className="fa-solid fa-pencil mx-1" onClick={()=>{edit_note(note)}}></i>
            </div>
            <p className="card-text">{note?.description || "No Description Available"}</p>
          </div>
        </div>
      </div>
    </>
  );
}