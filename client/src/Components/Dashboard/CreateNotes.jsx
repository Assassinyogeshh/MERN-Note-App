import React from "react";
import human3 from "../../assets/human-3.svg";
import { Link } from "react-router-dom";
const CreateNotes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.userData.userName : null;

  return (
    <>
      <div className="w-[100%] flex-col items-center justify-center h-[92vh] xs:h-[95vh] bg-yellow-500 box-border">
        <div className="flex justify-between items-center w-[85%] h-[10vh] ml-[8rem] xs:ml-[1rem] xm:ml-[10rem] sm:ml-12">
          <h1 className="font-[700] text-[25px] text-cyan-950 xs:text-[1.1rem] xs:font-[600]">
            Hey,{userName}
          </h1>
          <Link to={"/note/addNotes"}>
            <button className="border text-[13px] rounded-[1rem] bg-cyan-950 text-white font-[500] w-[7rem] h-[1.8rem] xs:w-[5rem] xs:text-[9.5px] xs:font-[400] xs:h-[1.4rem]">
              +New Note
            </button>
          </Link>
        </div>

        <div className="flex justify-start items-start gap-4 xs:gap-1">
          <img
            src={human3}
            className="h-[30rem] xm:ml-0 xm:h-[20rem] ml-[3rem] xs:ml-0 xs:h-[16rem]"
            alt="Human Image"
          />
          <span className="flex justify-start items-start flex-col mt-[2.9rem] w-[40%] gap-1">
            <p className="text-cyan-950 text-[1.5rem] font-[700] xs:text-[1.1rem] xs:font-[600] xm:text-[1.2rem]">
              Okay...
            </p>
            <p className="text-cyan-950 text-[1.5rem] font-[700] xs:text-[1.1rem] xs:font-[600] xm:text-[1.2rem]">
              Let's start with your first note!
            </p>
            <Link to={"/note/addNotes"}>
              <p className="text-blue-500 underline text-[1.5rem] font-[700] xs:text-[1.1rem] xs:font-[600] xm:text-[1.2rem]">
                Create One!
              </p>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default CreateNotes;
