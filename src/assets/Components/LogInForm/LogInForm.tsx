import { FormEvent, useState } from "react";
import { Users, UserLogin } from "../../DataTypes/DataTypes";

type LogInProps = {
  defaultLogInDetails: UserLogin;
  handleSubmit: (user: UserLogin) => void;
  incorrectPassword: boolean;
};

const LogInForm = ({ defaultLogInDetails, handleSubmit, incorrectPassword }: LogInProps) => {
  const [user, setUser] = useState<UserLogin>(defaultLogInDetails);
  const [emailInUse, setEmailInUse] = useState<boolean>(true);
  const [checksAllInputs, setChecksAllInputs] = useState<boolean>(false);

  const checkValidEmail = async () => {
    const response = await fetch(
      `http://localhost:8080/checkuserexists/${user.email}`
    );
    const existingEmail = await response.json();
    handletest(existingEmail)
  };

  const handleValidation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.email != "" || user.password != "") {
        checkValidEmail();
    } 
    
    if (user.email == "" || user.password == "") {
        setChecksAllInputs(true);
    }
  };

  const handletest = (existingEmail: boolean) => {

    if (existingEmail && user.password) {
        handleSubmit(user)
    } else {
        setEmailInUse(false)
    }
  }

  const handleInput = (event: FormEvent<HTMLInputElement>, key: string) => {
    setUser({ ...user, [key]: event.currentTarget.value });
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
        {!emailInUse && <p>Cannot find accound with his email address</p>}
        {incorrectPassword && <p>Sorry, that is not the correct password.</p>}
      </form>
    </div>
  );
};

export default LogInForm;
