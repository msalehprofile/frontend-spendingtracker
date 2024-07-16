import './LogInForm.scss';
import { FormEvent, useState } from "react";
import { Users, UserLogin } from "../../DataTypes/DataTypes";
import Button from '../Button/Button';

type LogInProps = {
  defaultLogInDetails: UserLogin;
  handleSubmitLogIn: (user: UserLogin) => void;
  incorrectPassword: boolean;
};

const LogInForm = ({ defaultLogInDetails, handleSubmitLogIn, incorrectPassword }: LogInProps) => {
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
      handleSubmitLogIn(user)
    } else {
        setEmailInUse(false)
    }
  }

  const handleInput = (event: FormEvent<HTMLInputElement>, key: string) => {
    setUser({ ...user, [key]: event.currentTarget.value });
  };

  return (
    <>
      <form  className="login-form" onSubmit={handleValidation}>
        <h1 className="login-form__heading" >Log in</h1>
        <p className="login-form__subheading">Email:</p>
        <input
          type="text"
          placeholder="email"
          onInput={(event) => handleInput(event, "email")}
          className="login-form__input"
        />
        <p className="login-form__subheading">Password:</p>
        <input
          type="text"
          placeholder="password"
          onInput={(event) => handleInput(event, "password")}
          className="login-form__input"
        />
        {/* <button type="submit">Log In</button> */}
        <Button label="Log in" size="small" color="primary"/>
        {checksAllInputs && <p className="login-form__error">Please complete all inputs</p>}
        {!emailInUse && <p className="login-form__error">Cannot find accound with his email address</p>}
        {incorrectPassword && <p className="login-form__error">Sorry, that is not the correct password.</p>}
      </form>
    </>
  );
};

export default LogInForm;
