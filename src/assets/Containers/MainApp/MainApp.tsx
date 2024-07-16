import "./MainApp.scss";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import UploadSpendPage from "../UploadSpendPage/UploadSpendPage";
import CreateUser from "../CreateUser/CreateUser";
import LogInPage from "../LogInPage/LogInPage";
import { UserLogin, Users, SubmittedSpends } from "../../DataTypes/DataTypes";
import Trends from "../Trends/Trends";
import UserProfile from "../UserProfile/UserProfile";
import SetBudgetPage from "../SetBudgetPage/SetBudgetPage";

const MainApp = () => {
  const [userFirstName, setUserFirstName] = useState<string>("Terry");
  const [userSecondName, setUserSecondName] = useState<string>("Smith");
  const [userEmail, setUserEmail] = useState<string>("test@test.com");
  const [userId, setUserId] = useState<number>(0);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);
  const [foundUser, setFoundUser] = useState<Users>();
  const [userPasswordEntered, setUserPasswordEntered] = useState<string>();
  const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmitLogIn = async (userLogin: UserLogin) => {
    setUserPasswordEntered(userLogin.password);
    const resp = await fetch(
      `http://localhost:8080/findUserByEmail/${userLogin.email}`
    );
    const data = await resp.json();
    setFoundUser(data);
  };

  const handleSubmitSpend = async (spendToSubmit: SubmittedSpends) => {
    await fetch("http://localhost:8080/addspend", {
      method: "POST",
      headers: { admin: "true", "Content-Type": "application/json" },
      body: JSON.stringify(spendToSubmit),
    });
  };

  const handleSignOut = () => {
    setUserLoggedIn(false);
    setUserFirstName("");
    setUserSecondName("");
    setUserId(0);
  };

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

  const defaultSpend = {
    amount: -1,
    vendor: "",
    category: "",
    date: "",
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
              handleSubmitLogIn={handleSubmitLogIn}
              incorrectPassword={incorrectPassword}
            />
          }
        />
        {userLoggedIn ? (
          <>
            <Route path="/dashboard" element={<Trends />} />
            <Route
              path="/uploadspend"
              element={
                <UploadSpendPage
                  defaultSpend={defaultSpend}
                  userId={userId}
                  handleSubmitSpend={handleSubmitSpend}
                />
              }
            />
            <Route
              path="/myprofile"
              element={
                <UserProfile
                  userFirstName={userFirstName}
                  userSecondName={userSecondName}
                  userEmail={userEmail}
                  handleSignOut={handleSignOut}
                />
              }
            />
            <Route path="/budgets" element={<SetBudgetPage />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </>
  );
};

export default MainApp;
