import React from 'react';
import CardLayout from '../components/CardLayout';
import InputForm from '../components/InputForm';
import Header from "../components/Header";

const AddUser = () => {
  return (
    <>
      <Header title={"Add User Pages"} />
      <CardLayout>
          <InputForm />
      </CardLayout>
    </>
  )
}

export default AddUser