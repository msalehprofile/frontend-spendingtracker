import './CreateUser.scss';
import { Users } from "../../DataTypes/DataTypes";
import CreateUserForm from "../../Components/CreateUserForm/CreateUserForm";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";

const CreateUser = () => {

  const handleSubmit = async (user: Users) => {
    await fetch("http://localhost:8080/createuser", {
      method: "POST",
      headers: { admin: "true", "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  };

  const defaultCreateUserFormState = {
    id: -1,
    firstName: "",
    secondName: "",
    email: "",
    password: "",
  };

  return (
    <div className="create-user">
      <Header/>
      <Link to="/"><p className="create-user__back">back</p></Link>
      
      <CreateUserForm
        handleSubmit={handleSubmit}
        defaultCreateUserFormState={defaultCreateUserFormState}
      />
    </div>
  );
};

export default CreateUser;
