import React, { useEffect, useState } from "react";
import CardLayout from "../components/CardLayout";
import CardList from "../components/CardList";
import Footer from "../components/Footer";
import Search from "../components/Search";
import { useSelector, useDispatch } from "react-redux";
import { getUser, userSelectors } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const UserList = () => {
  const dispatch = useDispatch();
  let user = useSelector(userSelectors.selectAll);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const npage = Math.ceil(user.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  let records = user.slice(firstIndex, lastIndex);

  const [filterSearch, setFilterSearch] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [filterSort, setFilterSort] = useState(true);

  const handleAddUser = (e) => {
    e.preventDefault();
    navigate("/add-user");
  };

  const handleSort = () => {
    let data;
    if(filterSort) {
      data = user.sort().reverse();
      records = data.slice(firstIndex, lastIndex)
    } else {
      data = user.sort().reverse();
      records = data.slice(firstIndex, lastIndex)
    }
    setFilterSort(!filterSort);
  };

  const handleNextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const handleSearch = (e) => {
    setValueSearch(e.target.value);
    let data = e.target.value;
    setFilterSearch(
      user.filter((e) => e.firstName.toLowerCase() === data.toLowerCase())
    );
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="container">
      <Header title={"User list Pages"} />
      <CardLayout>
        <Search
          handleSearch={handleSearch}
          handleSort={handleSort}
          filterSort={filterSort}
          valueSearch={valueSearch}
        />
        <div className="grid grid-cols-3 max-[576px]:grid-cols-1 max-[768px]:grid-cols-2 gap-3">
          {filterSearch.length > 0
            ? filterSearch.map((e, idx) => {
                return (
                  <div key={idx}>
                    <CardList
                      firstName={e.firstName}
                      lastName={e.lastName}
                      userName={e.userName}
                      email={e.email}
                      password={e.password}
                      confirmPassword={e.confirmPassword}
                      expiredDate={e.expiredDate}
                      groupAccess={e.groupAccess}
                      id={e.id}
                      setFilterSearch={setFilterSearch}
                      setValueSearch={setValueSearch}
                      
                    />
                  </div>
                );
              })
            : records.map((e, idx) => {
                return (
                  <div key={idx}>
                    <CardList
                      firstName={e.firstName}
                      lastName={e.lastName}
                      userName={e.userName}
                      email={e.email}
                      password={e.password}
                      confirmPassword={e.confirmPassword}
                      expiredDate={e.expiredDate}
                      groupAccess={e.groupAccess}
                      id={e.id}
                      setFilterSearch={setFilterSearch}
                      setValueSearch={setValueSearch}
                    />
                  </div>
                );
              })}
        </div>
        <Footer
          handleAddUser={handleAddUser}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          changePage={(id) => changePage(id)}
          numbers={numbers}
          currentPage={currentPage}
        />
      </CardLayout>
    </div>
  );
};

export default UserList;
