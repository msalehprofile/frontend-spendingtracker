import Button from "../../Components/Button/Button";
import DashboardNav from "../../Components/DashboardNav/DashboardNav";
import Header from "../../Components/Header/Header";
import "./UserProfile.scss";

type UserProfileProps = {
  userFirstName: string;
  userSecondName: string;
  userEmail: string;
  handleSignOut: () => void;
  brandName: string;
};
const UserProfile = ({
  userFirstName,
  userSecondName,
  userEmail,
  handleSignOut,
  brandName
}: UserProfileProps) => {


  return (
    <div>
      <Header brandName={brandName}/>
      <div className="userprofile-page">
        <img
          src="src/assets/DataTypes/profile.png"
          className="userprofile-page__image"
        />

        <h2 className="userprofile-page__name">
          {userFirstName} {userSecondName}
        </h2>
        <h2 className="userprofile-page__email">{userEmail}</h2>
        <Button onClick={handleSignOut} label="Sign out" color="primary" size="large" />
      </div>
      <DashboardNav />
    </div>
  );
};

export default UserProfile;
