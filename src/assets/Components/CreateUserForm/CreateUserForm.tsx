import "./CreateUserForm.scss";
import { FormEvent, useState } from "react";
import { Users } from "../../DataTypes/DataTypes";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

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
  const [spacesEntered, setSpacesEntered] = useState<boolean>(false);
  const navigate = useNavigate();

  const getExistingEmail = async () => {
    const response = await fetch(
      `https://54tav47oc4.execute-api.us-east-1.amazonaws.com/Prod/checkuserexists/${user.email}`
    );
    const existingEmail = await response.json();
    setEmailInUse(existingEmail);

    if (!existingEmail) {
      checkAbleToSubmit();
    } else {
      setEmailInUse(true);
    }
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

    if (user.password.includes(" ") || user.email.includes(" ") ) {
      setSpacesEntered(true);
    }

    if (user.email != "" && !user.password.includes(" ") && !user.email.includes(" ") && user.email.includes("@")) {
      getExistingEmail();
    }

  };

  const checkAbleToSubmit = () => {
    if (!emailInUse && !incompletedData && !invalidEmail) {
      handleSubmit(user);
      setIncompletedDate(false);
      setEmailInUse(false);
      setInvalidEmail(false);
      navigate("/frontend-spendingtracker/");
    }
    setEmailInUse(true);
  };

  const handleInput = (event: FormEvent<HTMLInputElement>, key: string) =>
    setUser({ ...user, [key]: event.currentTarget.value });

  return (
    <div>
      <form className="create-user-form" onSubmit={handleValidation}>
        <h1 className="create-user-form__heading">Create account</h1>
        <p className="create-user-form__subheading">First Name:</p>
        <input
          type="text"
          placeholder="First Name"
          value={user.firstName}
          onInput={(event) => handleInput(event, "firstName")}
          className="create-user-form__input"
        />
        <p className="create-user-form__subheading">Second Name:</p>
        <input
          type="text"
          placeholder="Second Name"
          value={user.secondName}
          onInput={(event) => handleInput(event, "secondName")}
          className="create-user-form__input"
        />
        <p className="create-user-form__subheading">Email address:</p>
        <input
          type="text"
          placeholder="email address"
          value={user.email}
          onInput={(event) => handleInput(event, "email")}
          className="create-user-form__input"
        />
        <p className="create-user-form__subheading">Password:</p>
        <input
          type="text"
          placeholder="Password"
          value={user.password}
          onInput={(event) => handleInput(event, "password")}
          className="create-user-form__input"
        />

        <Button label="Submit" size="small" color="primary" />
      </form>
      {incompletedData && (
        <p className="create-user-form__error">
          Please fill in all data fields.
        </p>
      )}
      {emailInUse && (
        <p className="create-user-form__error">
          This email already has an account created.
        </p>
      )}
      {invalidEmail && (
        <p className="create-user-form__error">
          This is not a valid email address.
        </p>
      )}

      {spacesEntered && (
        <p className="create-user-form__error">
          No spaces allowed in user details.
        </p>
      )}
    </div>
  );
};

export default CreateUserForm;
