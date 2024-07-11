
import LogInForm from "../../Components/LogInForm/LogInForm";
import { UserLogin } from "../../DataTypes/DataTypes";

type LogInPageProps = {
    handleSubmit:  (user: UserLogin) => void
    incorrectPassword: boolean;
}

const LogInPage = ({handleSubmit, incorrectPassword}: LogInPageProps) => {

  const defaultLogInDetails = {
    email:"",
    password:"",
  };

  return (
    <div>
      <LogInForm
        handleSubmit={handleSubmit}
        defaultLogInDetails={defaultLogInDetails}
        incorrectPassword={incorrectPassword}
      />
    </div>
  );
};

export default LogInPage;
