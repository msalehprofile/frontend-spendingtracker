import { FormEvent, useState } from "react";
import { Users, UserLogin } from "../../DataTypes/DataTypes";

type LogInProps = {
  defaultLogInDetails: UserLogin;
  handleSubmit: (user: UserLogin) => void;
};

const LogInForm = ({ defaultLogInDetails, handleSubmit }: LogInProps) => {
  const [user, setUser] = useState<UserLogin>(defaultLogInDetails);
  const [emailInUse, setEmailInUse] = useState<boolean>(false);
  const [checksAllInputs, setChecksAllInputs] = useState<boolean>(false);

  const handleValidation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user.email == "" || user.password == "") {
      setChecksAllInputs(true);
    } else {
      checkValidEmail();
    }

    if (emailInUse) {
        handleSubmit(user)
    }
  };

  const handleInput = (event: FormEvent<HTMLInputElement>, key: string) => {
    setUser({ ...user, [key]: event.currentTarget.value });
  };

  const checkValidEmail = async () => {
    const response = await fetch(
      `http://localhost:8080/findUser/${user.email}`
    );
    const existingEmail = await response.json();
    setEmailInUse(!existingEmail);
  };

  return (
    <div>
      <form onSubmit={handleValidation}>
        <p>Email:</p>
        <input
          type="text"
          placeholder="email"
          onInput={(event) => handleInput(event, "email")}
        />
        <p>Password:</p>
        <input
          type="text"
          placeholder="password"
          onInput={(event) => handleInput(event, "password")}
        />
        <button type="submit">Log In</button>
        {checksAllInputs && <p>Please complete all inputs</p>}
        {emailInUse && <p>Cannot find accound witht his email address</p>}
      </form>
    </div>
  );
};

export default LogInForm;
