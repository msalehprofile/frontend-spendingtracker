import DashboardNav from "../../Components/DashboardNav/DashboardNav";
import Header from "../../Components/Header/Header";
import "./ShowBudgetPage.scss";
import { UserBudget } from "../../DataTypes/DataTypes";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import BudgetPerfTile from "../../Components/BudgetPerfTile/BudgetPerfTile";

type ShowSpentPageProps = {
  brandName: string;
  amountSpentInCurrentMonth: number;
  userHealthSpent: string;
  userGroceriesSpent: string;
  userShoppingSpent: string;
  userGiftsSpent: string;
  userBillsSpent: string;
  userEatingOutSpent: string;
  userEntertainmentSpent: string;
  userTransportSpent: string;
  userBudget: UserBudget | undefined;
  onBudget: boolean;
  overBudget: boolean;
  noBudget: boolean;
  underBudget: boolean;
  moneySpentVsTargetSpend: string;
};

const ShowSpentPage = ({
  brandName,
  amountSpentInCurrentMonth,
  userHealthSpent,
  userGroceriesSpent,
  userShoppingSpent,
  userGiftsSpent,
  userBillsSpent,
  userEntertainmentSpent,
  userEatingOutSpent,
  userBudget,
  userTransportSpent,
  onBudget,
  overBudget,
  noBudget,
  underBudget,
  moneySpentVsTargetSpend,
}: ShowSpentPageProps) => {
  const items = [
    {
      category: "Bills",
      amountSpent: userBillsSpent ? userBillsSpent : 0,
      budget: userBudget ? userBudget.bills : 0,
    },
    {
      category: "Transport",
      amountSpent: userTransportSpent ? userTransportSpent : 0,
      budget: userBudget ? userBudget.transport : 0,
    },
    {
      category: "Groceries",
      amountSpent: userGroceriesSpent ? userGroceriesSpent : 0,
      budget: userBudget ? userBudget.groceries : 0,
    },
    {
      category: "Health",
      amountSpent: userHealthSpent ? userHealthSpent : 0,
      budget: userBudget ? userBudget.health : 0,
    },
    {
      category: "Eating Out",
      amountSpent: userEatingOutSpent ? userEatingOutSpent : 0,
      budget: userBudget ? userBudget.eatingOut : 0,
    },
    {
      category: "Entertainment",
      amountSpent: userEntertainmentSpent ? userEntertainmentSpent : 0,
      budget: userBudget ? userBudget.entertainment : 0,
    },
    {
      category: "Gifts",
      amountSpent: userGiftsSpent ? userGiftsSpent : 0,
      budget: userBudget ? userBudget.gifts : 0,
    },
    {
      category: "Shopping",
      amountSpent: userShoppingSpent ? userShoppingSpent : 0,
      budget: userBudget ? userBudget.shopping : 0,
    },
  ];

  return (
    <div>
      <Header brandName={brandName} />
      <div className="budget-page">
        <h2 className="budget-page__heading">Monthly Spends </h2>
        <p className="budget-page__income">
          £{userBudget?.monthlyIncome} income for the month
        </p>
        <p className="budget-page__subheading">Total:</p>
        <p className="budget-page__spent">
          £{amountSpentInCurrentMonth} out of £{userBudget?.monthlyIncome} spent
        </p>
        {noBudget && (
          <p className="budget-page__spent">You haven't set a budget yet</p>
        )}
        {overBudget && (
          <p className="budget-page__spent">
            You are currently <span className="budget-page__spent--bold">£{String(Number(moneySpentVsTargetSpend) * -1)}</span>{" "}
            over budget.
          </p>
        )}
        {underBudget && (
          <p className="budget-page__spent">
            You are currently <span className="budget-page__spent--bold">£{moneySpentVsTargetSpend}</span> under budget.
          </p>
        )}
        {onBudget && !noBudget && (
          <p className="budget-page__spent">
            You are currently spending how much you planned.
          </p>
        )}

        <Carousel className="budget-page__carousel">
          {items.map((item, i) => (
            <BudgetPerfTile
              key={i}
              category={item.category}
              amountSpent={item.amountSpent}
              budget={item.budget}
            />
          ))}
        </Carousel>
        <Link to="/setsbudgets">
          <Button label="Update budgets" color="primary" size="medium" />
        </Link>
      </div>
      <DashboardNav />
    </div>
  );
};

export default ShowSpentPage;
