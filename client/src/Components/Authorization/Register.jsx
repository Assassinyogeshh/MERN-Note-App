import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Store/Slices/authSlice";
import { useNavigate } from "react-router";

const Register = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.message) {
      alert(data.message);
      navigate("/");
    }
  }, [data, navigate]);

  const initialValues = {
    userName: "",
    email: "",
    C_password: "",
    password: "",
  };

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit: (values) => {
      try {
        dispatch(register(values));
      } catch (error) {
        console.log(error);
        alert("Registration Failed");
      }
    },
  });

  return (
    <>
      <div className="h-[92vh] w-[100%] xs:h-[95vh] flex flex-col justify-center items-center bg-yellow-500">
        <h1 className="text-[2rem] font-[700] tracking-wider text-gray-800">
          Register
        </h1>
        <form
          className="flex justify-center items-center flex-col gap-y-[2rem] border w-[55%] rounded-[1rem] h-[80%] "
          onSubmit={handleSubmit}
        >
          <span className="flex flex-col justify-start items-start w-[80%]">
            <label
              htmlFor="userName"
              className="font-[600] text-[1.1rem] leading-[1rem]"
            >
              Username
            </label>
            <input
              type="userName"
              name="userName"
              id="userName"
              value={values.userName}
              onChange={handleChange}
              className="w-[100%] h-[2.8rem] outline-none  bg-transparent border-b-2"
              placeholder=""
              autoComplete="on"
            />
          </span>

          <span className="flex flex-col justify-start items-start w-[80%]">
            <label
              htmlFor="email"
              className="font-[600] text-[1.1rem] leading-[1rem]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              className="w-[100%] h-[2.8rem] outline-none  bg-transparent border-b-2"
              placeholder=""
              autoComplete="on"
            />
          </span>

          <span className="flex flex-col justify-start items-start  w-[80%]">
            <label
              htmlFor="C_password"
              className="font-[600] text-[1.1rem] leading-[1rem]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="C_password"
              id="C_password"
              value={values.C_password}
              onChange={handleChange}
              className="w-[100%] outline-none h-[2.8rem] bg-transparent border-b-2"
            />
          </span>

          <span className="flex flex-col justify-start items-start  w-[80%]">
            <label
              htmlFor="password"
              className="font-[600] text-[1.1rem] leading-[1rem]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              className="w-[100%] outline-none h-[2.8rem] bg-transparent border-b-2"
            />
          </span>

          <button type="submit" className="w-[90%] h-[2.5rem] border">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
