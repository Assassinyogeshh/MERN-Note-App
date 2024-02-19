import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import human1 from "../assets/human-1.svg";
import human2 from "../assets/human-2.svg";
import stars from "../assets/stars.svg";
const Notes = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const showMSG = () => {
    if (!user) {
      alert("login Before Creating Note");
    } else {
      navigate("/createNotes");
    }
  };

  return (
    <>
      <div className="flex justify-evenly items-center bg-yellow-500 h-[92vh]  xs:h-[95vh] w-full ">
        <span className="flex items-end h-[100%]  xs:hidden xm:hidden lg:flex sm:hidden md:flex">
          <img src={human1} alt="human" />
        </span>
        <div className="w-[100%]  bg-yellow-500 h-[82vh] flex flex-col justify-around  items-center gap-y-[1.5rem] box-border">
          <span className="flex justify-center items-end mt-6">
            <span className="h-[100%]">
              <img
                src={stars}
                className=" xs:w-[2rem] xm:w-[2.6rem] sm:w-[5rem]"
                alt="stars"
              />
            </span>
            <p className="w-[29rem] text-[3.5rem] text-center font-[700] leading-[4rem] tracking-[3px] text-cyan-950  xs:text-[1.2rem]  xs:tracking-[2px]  xs:leading-[1.4rem]  xs:w-[18rem] xm:text-[1.5rem] xm:tracking-[3px] xm:leading-[1.4rem] xm:w-[19rem] sm:w-[28rem] sm:text-[3rem] sm:leading-[3rem] sm:tracking-[5px]">
              Write your thoughts down as they come to you.
            </p>
            <img
              src={stars}
              className=" h-[40%] w-[5rem] flex  justify-end items-end  xs:h-[32%] xm:h-[45%]  xs:w-[2rem] xm:w-[3rem] sm:w-[4.5rem] sm:h-[30%]"
              alt="stars"
            />
          </span>
          <p
            className=" text-cyan-950 w-[29rem] font-[500] text-center  xs:w-[18rem]  xs:text-[11px] xm:w-[25rem] xm:text-[15px] sm:w-[30rem] sm:text-[20px]
          "
          >
            Notes is simple to use free note taking app made with Node.js, EJS &
            MongoDB.
          </p>

          <button
            className="text-white bg-sky-950 rounded-[1rem] w-[15rem] h-[1.9rem]  xs:w-[13rem]  xs:text-[10px]  xs:h-[1.5rem] font-[500] sm:w-[16rem] sm:rounded-[1.2rem] sm:h-[2.7rem] sm:text-[18px]"
            onClick={showMSG}
          >
            Try Notes, It's Free!
          </button>

          <footer className="h-[8vh] w-[50%] bg-yellow-500 flex items-end justify-center text-[1.2rem] font-[600]">
            <p>Notes</p>
            <span></span>
          </footer>
        </div>
        <span className="flex items-end h-[100%]  xs:hidden xm:hidden lg:flex sm:hidden md:flex">
          <img src={human2} alt="human" />
        </span>
      </div>
    </>
  );
};

export default Notes;
