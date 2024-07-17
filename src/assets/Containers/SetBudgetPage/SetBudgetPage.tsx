import { useState } from "react";
import DashboardNav from "../../Components/DashboardNav/DashboardNav";
import Header from "../../Components/Header/Header";
import "./SetBudgetPage.scss";
import { UserBudget } from "../../DataTypes/DataTypes";

const SetBudgetPage = () => {
    const [userBudget, setUserBudget] = useState<UserBudget>();
  return (
    <div>
      <Header />
      <DashboardNav />
    </div>
  );
};

export default SetBudgetPage;
