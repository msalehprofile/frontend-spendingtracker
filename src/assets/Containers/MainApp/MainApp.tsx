import "./MainApp.scss";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import UploadSpendPage from "../UploadSpendPage/UploadSpendPage";
import CreateUser from "../CreateUser/CreateUser";
import LogInPage from "../LogInPage/LogInPage";
import { UserLogin, Users } from "../../DataTypes/DataTypes";
import Trends from "../Trends/Trends";
import UserProfile from "../UserProfile/UserProfile";

const MainApp = () => {
  const [userFirstName, setUserFirstName] = useState<string>("Terry");
  const [userSecondName, setUserSecondName] = useState<string>("Smith");
  const [userEmail, setUserEmail] = useState<string>("test@test.com");
  const [userId, setUserId] = useState<number>();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);
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

  const handleSignOut = () => {
    setUserLoggedIn(false)
    setUserFirstName("")
    setUserSecondName("")
    setUserId(0)
  }

  const passwordCheck = () => {
    if (foundUser && foundUser.email != undefined) {
      // console.log("getting here")
      // console.log("user name entered:" , userPasswordEntered, "found name:" ,foundUser.email)
      if (userPasswordEntered == foundUser.password) {
        console.log(userPasswordEntered, foundUser.password);
        setUserFirstName(foundUser.firstName);
        setUserSecondName(foundUser.secondName);
        setUserId(foundUser.id);
        setUserEmail(foundUser.email);
        setUserLoggedIn(true);
        setIncorrectPassword(false);
        navigate("/dashboard");
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
          <>
            <Route path="/dashboard" element={<Trends />} />
            <Route path="/uploadspend" element={<UploadSpendPage />} />
            <Route path="/myprofile" element={<UserProfile userFirstName={userFirstName} userSecondName={userSecondName} userEmail={userEmail} handleSignOut={handleSignOut}/>} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </>
  );
};

export default MainApp;
