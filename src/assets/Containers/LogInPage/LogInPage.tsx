import React from "react";
import LogInForm from "../../Components/LogInForm/LogInForm";
import { UserLogin } from "../../DataTypes/DataTypes";

type LogInPageProps = {
    handleSubmit:  (user: UserLogin) => void
}

const LogInPage = ({handleSubmit}: LogInPageProps) => {

  const defaultLogInDetails = {
    email:"",
    password:"",
  };

  

  return (
    <div>
      <LogInForm
        handleSubmit={handleSubmit}
        defaultLogInDetails={defaultLogInDetails}
      />
    </div>
  );
};

export default LogInPage;
