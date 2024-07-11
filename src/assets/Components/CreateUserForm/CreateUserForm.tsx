import "./CreateUserForm.scss";
import { FormEvent, useState } from "react";
import { Users } from "../../DataTypes/DataTypes";
import { useNavigate } from "react-router-dom";

type CreateUserProps = {
  defaultCreateUserFormState: Users;
  handleSubmit: (user: Users) => void;
};

export const CreateUserForm = ({
  handleSubmit,
  defaultCreateUserFormState,
}: CreateUserProps) => {
  const [user, setUser] = useState<Users>(defaultCreateUserFormState);
  const [incompletedData, setIncompletedDate] = useState<boolean>(false);
  const [emailInUse, setEmailInUse] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const navigate = useNavigate();

  const getExistingEmail = async () => {
    const response = await fetch(
      `http://localhost:8080/checkuserexists/${user.email}`
    );
    const existingEmail = await response.json();
    console.log(existingEmail)
    setEmailInUse(existingEmail);
  };

  const handleValidation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.values(user).some((value) => !value)) {
      setIncompletedDate(true);
      return;
    } else {
        setIncompletedDate(false);
    }

    if (!user.email.includes("@")) {
      setInvalidEmail(true);
    }

    if (user.email != "") {
      getExistingEmail();
    }

    checkAbleToSubmit()
  };

  const checkAbleToSubmit = () => {
    if (!emailInUse && !incompletedData && !invalidEmail) {
        console.log("Thank you for creating a user");
        handleSubmit(user);
        setIncompletedDate(false);
        setEmailInUse(false);
        setInvalidEmail(false);
        navigate("/")
      }
  }

  const handleInput = (event: FormEvent<HTMLInputElement>, key: string) =>
    setUser({ ...user, [key]: event.currentTarget.value });



  return (
    <div>
      <form onSubmit={handleValidation}>
        <p>First Name:</p>
        <input
          type="text"
          placeholder="First Name"
          value={user.firstName}
          onInput={(event) => handleInput(event, "firstName")}
        />
        <p>Second Name:</p>
        <input
          type="text"
          placeholder="Second Name"
          value={user.secondName}
          onInput={(event) => handleInput(event, "secondName")}
        />
        <p>Email address:</p>
        <input
          type="text"
          placeholder="email address"
          value={user.email}
          onInput={(event) => handleInput(event, "email")}
        />
        <p>Password:</p>
        <input
          type="text"
          placeholder="Password"
          value={user.password}
          onInput={(event) => handleInput(event, "password")}
        />
        <button type="submit">Submit</button>
      </form>
      {incompletedData && <p>Please fill in all data fields.</p>}
      {emailInUse && <p>This email already has an account created.</p>}
      {invalidEmail && <p>This is not a valid email address.</p>}
    </div>
  );
};

export default CreateUserForm;
