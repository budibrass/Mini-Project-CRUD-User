import React from "react";
import { deleteUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CardList = ({
  firstName,
  lastName,
  userName,
  email,
  password,
  confirmPassword,
  expiredDate,
  groupAccess,
  id,
  setFilterSearch,
  setValueSearch
}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
    setFilterSearch([]);
    setValueSearch("")
  };

  const toHandleEditPage = (id) => {
    navigate(`/edit-user/${id}`)
  };

  return (
    <div className="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
      <div className="border-b-2 text-xl font-medium border-neutral-100 px-6 py-3 dark:border-neutral-500 text-slate-950" style={{ color: "#2f8331"}}>
        {firstName} 
      </div>
      <div className="">
        {/* <span className="mb-2 text-sm leading-tight text-neutral-800 dark:text-neutral-50"> */}
        <div className="border-b border-neutral-100 mt-2 p-2">
          <div className="grid grid-cols-2 gap-2 ms-3">
            <div>
              <p className="font-medium text-sm text-center">First Name</p>
              <p className="font-small text-xs text-center">{firstName}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-center">Last Name</p>
              <p className="font-small text-xs text-center">{lastName}</p>
            </div>
          </div>
        </div>
        <div className="border-b border-neutral-100 mt-2 p-2">
          <div className="grid grid-cols-2 gap-2 ms-3">
            <div>
              <p className="font-medium text-sm text-center">Username</p>
              <p className="font-small text-xs text-center">{userName}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-center">Email</p>
              <p className="font-small text-xs text-center">{email}</p>
            </div>
          </div>
        </div>
        <div className="border-b border-neutral-100 mt-2 p-2">
          <div className="grid grid-cols-2 gap-2 ms-3">
            <div>
              <p className="font-medium text-sm text-center">Password</p>
              <p className="font-small text-xs text-center">{password}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-center">
                Confirm Password
              </p>
              <p className="font-small text-xs text-center">{confirmPassword}</p>
            </div>
          </div>
        </div>
        <div className="border-b border-neutral-100 mt-2 p-2">
          <div className="grid grid-cols-2 gap-2 ms-3">
            <div>
              <p className="font-medium text-sm text-center">Expired Date</p>
              <p className="font-small text-xs text-center">{expiredDate}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-center">Group Access</p>
              <p className="font-small text-xs text-center">{groupAccess}</p>
            </div>
          </div>
        </div>
        {/* </span> */}
      </div>
      <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600">
        <div className="justify-between flex">
            <i className="far fa-edit fa-lg cursor-pointer" onClick={()=> toHandleEditPage(id)} style={{color: "#46a09e"}}></i>
            <i className="far fa-trash fa-lg cursor-pointer" onClick={()=> handleDeleteUser(id)} style={{color: "#e32b16"}}></i>
        </div>
      </div>
    </div>
  );
};

export default CardList;
