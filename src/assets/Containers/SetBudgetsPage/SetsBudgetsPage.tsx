import "./SetsBudgetsPage.scss";
import DashboardNav from "../../Components/DashboardNav/DashboardNav";
import Header from "../../Components/Header/Header";
import SetsBudgetsForm from "../../Components/SetsBugdetsForm/SetsBudgetsForm";
import { UserBudget } from "../../DataTypes/DataTypes";
import { useNavigate } from "react-router-dom";

type SetsBudgetsPageProps = {
  brandName: string;
  userId: number;
  userBudget: UserBudget | undefined;
  handleGetUserBugdets: (userId: number) => void;
  calculateSpendPerformance: () => void;
  confirmVarToBudget: () => void;
};

const SetsBudgetsPage = ({
  brandName,
  userId,
  userBudget,
  handleGetUserBugdets,
  calculateSpendPerformance,
  confirmVarToBudget,
}: SetsBudgetsPageProps) => {
  const navigate = useNavigate();

  let defaultBudgets = {
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
    transport: 0,
  };

  if (userBudget != undefined) {
    defaultBudgets = {
      id: userBudget.id,
      userId: userId,
      monthlyIncome: userBudget.monthlyIncome,
      bills: userBudget.bills,
      eatingOut: userBudget.eatingOut,
      entertainment: userBudget.entertainment,
      gifts: userBudget.gifts,
      shopping: userBudget.shopping,
      groceries: userBudget.groceries,
      health: userBudget.health,
      transport: userBudget.transport,
    };
  }

  const handleSubmitBudget = async (userBudgetsToSet: UserBudget) => {
    await fetch(
      "https://54tav47oc4.execute-api.us-east-1.amazonaws.com/Prod/createbudget",
      {
        method: "POST",
        headers: { admin: "true", "Content-Type": "application/json" },
        body: JSON.stringify(userBudgetsToSet),
      }
    );
    handleGetUserBugdets(userId);
    calculateSpendPerformance();
    confirmVarToBudget();
    navigate("/frontend-spendingtracker/budgets");
  };

  return (
    <>
      <Header brandName={brandName} />
      <div className="set-budget-page">
        <SetsBudgetsForm
          defaultBudgets={defaultBudgets}
          handleSubmitBudget={handleSubmitBudget}
          userBudget={userBudget}
        />
      </div>
      <DashboardNav />
    </>
  );
};

export default SetsBudgetsPage;
