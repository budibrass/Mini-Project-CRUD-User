import React from 'react';
import CardLayout from '../components/CardLayout';
import InputForm from '../components/InputForm';
import Header from "../components/Header";

const EditUser = () => {
  return (
    <>
      <Header title={"Edit User Pages"} />
      <CardLayout>
          <InputForm />
      </CardLayout>
    </>
  )
}

export default EditUser;