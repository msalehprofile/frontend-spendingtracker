import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./assets/Containers/Welcome/Welcome";
import CreateUser from "./assets/Containers/CreateUser/CreateUser";
import LogInPage from "./assets/Containers/LogInPage/LogInPage";
import { UserLogin, Users } from "./assets/DataTypes/DataTypes";

function App() {
  const [userName, setUserName] = useState<String>('');
  const [userId, setUserId] = useState<number>();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<Users>();


  const handleSubmit = async (user: UserLogin) => {
    const resp = await fetch(`http://localhost:8080/findUserByEmail/${user.email}`)
    const data = await resp.json()
    setUser(data)
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/createuser" element={<CreateUser/>} />
          <Route path="/login" element={<LogInPage handleSubmit={handleSubmit}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
