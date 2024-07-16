import "./MainApp.scss";
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Welcome from "../Welcome/Welcome";

import CreateUser from "../CreateUser/CreateUser";
import LogInPage from "../LogInPage/LogInPage";
import { UserLogin, Users } from "../../DataTypes/DataTypes";
import UserPages from "../UserPages/UserPages";

const MainApp = () => {
  const [userName, setUserName] = useState<String>("");
  const [userId, setUserId] = useState<number>();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [foundUser, setFoundUser] = useState<Users>();
  const [userPasswordEntered, setUserPasswordEntered] = useState<string>();
  const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (userLogin: UserLogin) => {
    // console.log(userLogin.email)
    setUserPasswordEntered(userLogin.password);
    const resp = await fetch(
      `http://localhost:8080/findUserByEmail/${userLogin.email}`
    );
    const data = await resp.json();
    setFoundUser(data);
  };

  const passwordCheck = () => {
    if (foundUser && foundUser.email != undefined) {
      // console.log("getting here")
      // console.log("user name entered:" , userPasswordEntered, "found name:" ,foundUser.email)
      if (userPasswordEntered == foundUser.password) {
        console.log(userPasswordEntered, foundUser.password);
        setUserName(foundUser.firstName);
        setUserId(foundUser.id);
        setUserLoggedIn(true);
        setIncorrectPassword(false);
      } else {
        setIncorrectPassword(true);
      }
    }
  };

  useEffect(() => {
    if (foundUser && userPasswordEntered) {
      passwordCheck();
    }
  }, [foundUser]);

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/dashboard");
    }
  }, [userLoggedIn, navigate]);

  console.log("is logged in: ", userLoggedIn);
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route
          path="/login"
          element={
            <LogInPage
              handleSubmit={handleSubmit}
              incorrectPassword={incorrectPassword}
            />
          }
        />
        {userLoggedIn ? (
          <Route path="/dashboard" element={<UserPages />} />
        ) : (
          <Route path="/dashboard" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </>
  );
};

export default MainApp;
