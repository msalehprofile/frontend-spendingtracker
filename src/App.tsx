import './App.scss'
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./assets/Containers/Welcome/Welcome";
import CreateUser from "./assets/Containers/CreateUser/CreateUser";
import LogInPage from "./assets/Containers/LogInPage/LogInPage";
import { UserLogin, Users } from "./assets/DataTypes/DataTypes";


function App() {
  const [userName, setUserName] = useState<String>('');
  const [userId, setUserId] = useState<number>();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [foundUser, setFoundUser] = useState<Users>();
  const [userPasswordEntered, setUserPasswordEntered] = useState<string>();
  const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);


  const handleSubmit = async (userLogin: UserLogin) => {
    console.log(userLogin.email)
    setUserPasswordEntered(userLogin.password)
    const resp = await fetch(`http://localhost:8080/findUserByEmail/${userLogin.email}`)
    const data = await resp.json()
    setFoundUser(data)
  }

  const passwordCheck = () => {
    if(foundUser && foundUser.email != undefined) {
      console.log("getting here")
      console.log("user name entered:" , userPasswordEntered, "found name:" ,foundUser.email)
      if (userPasswordEntered == foundUser.password) {
        console.log(userPasswordEntered, foundUser.password)
        setUserName(foundUser.firstName)
        setUserId(foundUser.id)
        setUserLoggedIn(true)
        setIncorrectPassword(false)
      }  else {
        setIncorrectPassword(true)
      }
    }
  }

  useEffect(() => {
    if (foundUser && userPasswordEntered) {
      passwordCheck();
    }
  }, [foundUser]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/createuser" element={<CreateUser/>} />
          <Route path="/login" element={<LogInPage handleSubmit={handleSubmit} incorrectPassword={incorrectPassword}/> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
