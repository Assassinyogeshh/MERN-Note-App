import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addNote } from "../../Store/Slices/noteSlice/notesSlice";

const NewNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    body: "",
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      try {
        const response = dispatch(addNote(values));
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
            <p>Add Note</p>
          </Link>
        </span>

        <form
          className="flex flex-col h-[77%] justify-start items-start w-[85%] gap-y-2"
          onSubmit={handleSubmit}
        >
          <h1 className="text-[1.4rem]">Add Note</h1>

          <input
            type="text"
            name="title"
            id="title"
            className="capitalize pl-1 w-[100%] outline-none mb-2 placeholder-cyan-950 text-[1.5rem] font-[600]"
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
            +Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default NewNotes;
