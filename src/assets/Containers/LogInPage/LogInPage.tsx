import "./LogInPage.scss";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import LogInForm from "../../Components/LogInForm/LogInForm";
import { UserLogin } from "../../DataTypes/DataTypes";

type LogInPageProps = {
  handleSubmitLogIn: (user: UserLogin) => void;
  incorrectPassword: boolean;
  brandName: string;
};

const LogInPage = ({
  handleSubmitLogIn,
  incorrectPassword,
  brandName,
}: LogInPageProps) => {
  const defaultLogInDetails = {
    email: "",
    password: "",
  };

  return (
    <div className="login-page">
      <Header brandName={brandName} />
      <Link to="/frontend-spendingtracker/">
        <p className="login-page__back">back</p>
      </Link>
      <LogInForm
        handleSubmitLogIn={handleSubmitLogIn}
        defaultLogInDetails={defaultLogInDetails}
        incorrectPassword={incorrectPassword}
      />
    </div>
  );
};

export default LogInPage;
