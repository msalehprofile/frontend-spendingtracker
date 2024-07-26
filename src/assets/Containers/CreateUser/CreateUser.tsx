import "./CreateUser.scss";
import { Users } from "../../DataTypes/DataTypes";
import CreateUserForm from "../../Components/CreateUserForm/CreateUserForm";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";

type CreateUserProps = {
  brandName: string;
};

const CreateUser = ({ brandName }: CreateUserProps) => {
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
      <Header brandName={brandName} />
      <Link to="/frontend-spendingtracker/">
        <p className="create-user__back">back</p>
      </Link>

      <CreateUserForm
        handleSubmit={handleSubmit}
        defaultCreateUserFormState={defaultCreateUserFormState}
      />
    </div>
  );
};

export default CreateUser;
