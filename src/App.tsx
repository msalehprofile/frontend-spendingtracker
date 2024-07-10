import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./assets/Containers/Welcome/Welcome";
import CreateUser from "./assets/Containers/CreateUser/CreateUser";

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/createuser" element={<CreateUser/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
