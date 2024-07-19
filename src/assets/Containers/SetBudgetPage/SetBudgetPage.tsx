import { useState } from "react";
import DashboardNav from "../../Components/DashboardNav/DashboardNav";
import Header from "../../Components/Header/Header";
import "./SetBudgetPage.scss";
import { UserBudget } from "../../DataTypes/DataTypes";

type SetBudgetPageProps = {
  brandName: string;
} 

const SetBudgetPage = ({brandName}: SetBudgetPageProps) => {
    const [userBudget, setUserBudget] = useState<UserBudget>();
  return (
    <div>
      <Header brandName={brandName}/>
      <DashboardNav />
    </div>
  );
};

export default SetBudgetPage;
