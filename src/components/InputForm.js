/*eslint-disable*/
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveUser,
  getUser,
  updateUser,
  userSelectors,
} from "../features/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { usePasswordValidation } from "../hooks/usePasswordValidation";

const InputForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  let date = new Date();
  let tanggal = date.getDate().toString();
  let bulan = (date.getMonth() + 1).toString();
  let tahun = date.getFullYear().toString();
  let bulanConvert = bulan.length === 1 ? "0" + bulan : bulan;
  let today = `${tahun}-${bulanConvert}-${tanggal}`;

  const user = useSelector((state) => userSelectors.selectById(state, id));

  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    expiredDate: "",
    groupAccess: "",
  });

  const [validLength, upperCase, lowerCase, match, specialChar] =
    usePasswordValidation({
      firstPassword: payload.password,
      secondPassword: payload.confirmPassword,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await dispatch(
        updateUser({
          id,
          firstName: payload.firstName,
          lastName: payload.lastName,
          userName: payload.userName,
          email: payload.email,
          password: payload.password,
          confirmPassword: payload.confirmPassword,
          expiredDate: payload.expiredDate,
          groupAccess: payload.groupAccess,
        })
      );
      navigate("/");
    } else {
      await dispatch(saveUser(payload));
      navigate("/");
    }
  };

  const handleCancelForm = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const fetchData = useCallback(() => {
    if (user) {
      setPayload({
        ...payload,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        expiredDate: user.expiredDate,
        groupAccess: user.groupAccess,
      });
    }
  }, [payload, user]);

  useEffect(() => {
    if (id) {
      dispatch(getUser());
    }
  }, [dispatch, id]);


  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeForm = (e) => {
    if (e.target.id === "firstName") {
      setPayload({ ...payload, firstName: e.target.value });
    } else if (e.target.id === "lastName") {
      setPayload({ ...payload, lastName: e.target.value });
    } else if (e.target.id === "userName") {
      setPayload({ ...payload, userName: e.target.value });
    } else if (e.target.id === "email") {
      setPayload({ ...payload, email: e.target.value });
    } else if (e.target.id === "password") {
      setPayload({ ...payload, password: e.target.value });
    } else if (e.target.id === "confirmPassword") {
      setPayload({ ...payload, confirmPassword: e.target.value });
    } else if (e.target.id === "expiredDate") {
      setPayload({ ...payload, expiredDate: e.target.value });
    } else {
      setPayload({ ...payload, groupAccess: e.target.value });
    }
  };

  return (
    <div className="bg-white rounded-md">
      <form onSubmit={handleSubmit} className="p-3">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-nonedark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleChangeForm}
              value={payload.firstName}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-nonedark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleChangeForm}
              value={payload.lastName}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Last name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="userName"
              id="userName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-nonedark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleChangeForm}
              value={payload.userName}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Username
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-nonedark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleChangeForm}
              value={payload.email}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          {validLength && upperCase && lowerCase && specialChar ? (
            ""
          ) : payload.password === "" ? "" : (
            <div className="text-sm text-red-600 max-[320px]:text-xs">
              Silahkan masukkan password dengan format yang telah ditentukan
            </div>
          )}
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-nonedark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={handleChangeForm}
            value={payload.password}
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          {match ? (
            ""
          ) : payload.confirmPassword === "" ? "" : (
            <div className="text-sm text-red-600">
              Password yang dimasukkan tidak sama
            </div>
          )}
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-nonedark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={handleChangeForm}
            value={payload.confirmPassword}
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Confirm password
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="expiredDate"
              id="expiredDate"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-nonedark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleChangeForm}
              value={payload.expiredDate}
              min={today}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Expired Date
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="underline_select"
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option>Pilih Group</option>
              <option selected={payload.groupAccess === "Developer" ? true : false} value="Developer">Developer</option>
              <option selected={payload.groupAccess === "Devops" ? true : false} value="Devops">Devops</option>
              <option selected={payload.groupAccess === "QualityAssurance" ? true : false} value="QualityAssurance">Quality Assurance</option>
              <option selected={payload.groupAccess === "ProductManager" ? true : false} value="ProductManager">Product Manager</option>
            </select>
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Group Access
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={validLength && upperCase && lowerCase && match && specialChar ? false : true}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2 max-[576px]:mx-3 max-[320px]:mx-3"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancelForm}
            className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-2 cursor-pointer max-[320px]:mx-3 max-[576px]:mx-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
