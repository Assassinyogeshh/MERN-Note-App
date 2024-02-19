import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/Slices/authSlice";
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToken = useSelector((state) => state.auth.user?.token);

  const handleLogout = () => {
    dispatch(logout());
    alert("you have been logout");
    navigate("/");
  };

  useEffect(() => {
    if (userToken) {
      const decodeToken = jwtDecode(userToken);

      const currentTime = new Date().getTime();

      if (decodeToken.exp * 1000 < currentTime) {
        handleLogout();
      }
    }
  }, [userToken, handleLogout]);

  return (
    <>
      <ul
        className="mx-0 w-[100%] text-base h-[8vh] flex justify-between items-center list-none bg-yellow-500
       xs:h-[5vh] "
      >
        <Link to={"/"}>
          <li className="text-[25px] text-sky-950 font-[700] w-fit  flex justify-center items-center h-full xs:text-[12px] xm:text-[22px] sm:text-[24px]">
            Notes
          </li>
        </Link>

        <li className="flex w-[25rem] ml-[2.9rem] h-full justify-evenly items-center text-base cursor-pointer xs:text-[10px] xs:w-[15rem] xs:ml-2 xm:gap-y-[2rem] xm:text-[12px] xm:w-[11rem] xm:ml-[1rem] sm:w-[20rem] sm:text-[18px]">
          <Link to={"/"}>
            <p>Home</p>
          </Link>
          <p>Features</p>
          <p>FAQs</p>
          <p>About</p>
        </li>

        {userToken ? (
          <li>
            <button
              className=" hover:bg-cyan-800 hover:text-white h-[2rem] border border-solid border-black rounded-2xl w-[6.5rem] xs:text-[9px] xs:w-[3rem]
          xs:h-[1rem] justify-center items-center flex xm:h-[1.5rem] xm:w-[3.9rem] text-[11px] sm:w-[5.5rem] sm:h-[2rem] sm:text-[20px]"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <li className="flex w-[250px] h-full items-center justify-evenly xs:w-[200px] xm:w-[150px] sm:w-[190px]">
            <Link to={"/auth/register"}>
              <button
                className=" hover:bg-cyan-800 hover:text-white h-[2rem] border border-solid border-black rounded-2xl w-[6.5rem] xs:text-[9px] xs:w-[3rem]
          xs:h-[1rem] justify-center items-center flex xm:h-[1.5rem] xm:w-[3.9rem] text-[11px] sm:w-[5.5rem] sm:h-[2rem] sm:text-[20px]"
              >
                Sign Up
              </button>
            </Link>
            <Link to={"/auth/login"}>
              <button
                className=" hover:bg-cyan-800 hover:text-white h-[2rem] border border-solid border-black rounded-2xl w-[6.5rem] xs:text-[9px] xs:w-[3rem]
          xs:h-[1rem] justify-center items-center flex xm:h-[1.5rem] xm:w-[3.9rem] text-[11px] sm:w-[5.5rem] sm:h-[2rem] sm:text-[20px]"
              >
                Sign In
              </button>
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Navbar;
