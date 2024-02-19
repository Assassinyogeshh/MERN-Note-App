import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  deleteNote,
  fetchEachNote,
  updateNote,
} from "../../Store/Slices/noteSlice/notesSlice";
const EditNotes = () => {
  const { id } = useParams();

  const note = useSelector((state) => state.userNote?.note);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchEachNote(id));
  }, []);

  useEffect(() => {
    if (note) {
      setValues({
        title: note.title || "",
        body: note.body || "",
      });
    }
  }, [note]);

  const handleDelete = () => {
    dispatch(deleteNote(id));
    alert("Note Successfully Deleted");
    navigate("/dashboard");
  };

  const initialValues = {
    title: note?.title || "",
    body: note?.body || "",
  };

  const { values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues,
    onSubmit: (values) => {
      try {
        dispatch(updateNote({ values, id }));
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className="w-[100%] flex flex-col justify-center items-center h-[92vh] bg-yellow-500 gap-2">
        <span className="flex justify-start items-start w-[85%] gap-x-[2px] font-[400] text-[1rem]">
          <Link
            to={"/dashboard"}
            className="hover:text-blue-500 hover:underline"
          >
            <p>Dashboard</p>
          </Link>
          <p>/</p>
          <Link className="hover:text-blue-500 hover:underline">
            <p className="capitalize">{note?.title} Note</p>
          </Link>
        </span>

        <form
          className="flex flex-col h-[77%] justify-start items-start w-[85%] gap-y-2"
          onSubmit={handleSubmit}
        >
          <span className="flex justify-between item-center w-[100%]">
            <h1 className="text-[1.4rem]">Update Note</h1>
            <button
              className="rounded-[1.2rem] w-[8rem] h-[1.8rem] text-white bg-cyan-950 text-[0.8rem]"
              onClick={handleDelete}
              type="button"
            >
              Delete Note
            </button>
          </span>

          <input
            type="text"
            name="title"
            id="title"
            className=" pl-1 w-[100%] outline-none mb-2 placeholder-cyan-950 text-cyan-950 text-[1.5rem] font-[600] capitalize"
            placeholder="Title"
            value={values.title}
            onChange={handleChange}
          />
          <textarea
            name="body"
            id="body"
            cols="113"
            rows="9"
            value={values.body}
            onChange={handleChange}
            className=" placeholder:cyan-950 w-[100%] text-[1.37rem] p-1 font-[400] outline-none xs:w-[100%] xm:w-[100%]"
            placeholder="Take a note..."
          ></textarea>

          <button
            className="rounded-[1.2rem] w-[7rem] h-[2rem] text-white bg-cyan-950 text-[1rem]"
            type="submit"
          >
            Update Note
          </button>
        </form>
      </div>
    </>
  );
};

export default EditNotes;
