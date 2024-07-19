import { FormEvent } from "react";
import "./SetsBudgetsPage.scss";
import DashboardNav from "../../Components/DashboardNav/DashboardNav";
import Header from "../../Components/Header/Header";
import SetsBudgetsForm from "../../Components/SetsBugdetsForm/SetsBudgetsForm";
import { UserBudget } from "../../DataTypes/DataTypes";

type SetsBudgetsPageProps = {
  brandName: string;
  userId: number;
};

const SetsBudgetsPage = ({ brandName, userId }: SetsBudgetsPageProps) => {
  const defaultBudgets = {
    id: -1,
    userId: userId,
    monthlyIncome: 0,
    bills: 0,
    eatingOut: 0,
    entertainment: 0,
    gifts: 0,
    shopping: 0,
    groceries: 0,
    health: 0,
  };

  const handleSubmitFirstBudget = async (userBudgetsToSet: UserBudget) => {
    console.log(userBudgetsToSet)
    await fetch("http://localhost:8080/createbudget", {
      method: "POST",
      headers: { admin: "true", "Content-Type": "application/json" },
      body: JSON.stringify(userBudgetsToSet),
    });
  };

  return (
    <div>
      <Header brandName={brandName} />
      <SetsBudgetsForm
        defaultBudgets={defaultBudgets}
        handleSubmitFirstBudget={handleSubmitFirstBudget}
      />
      <DashboardNav />
    </div>
  );
};

export default SetsBudgetsPage;
