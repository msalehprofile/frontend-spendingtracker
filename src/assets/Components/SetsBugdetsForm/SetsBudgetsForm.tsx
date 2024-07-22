import { FormEvent, useState } from "react";
import "./SetsBudgetsForm.scss";
import Button from "../Button/Button";
import { UserBudget } from "../../DataTypes/DataTypes";

type SetsBudgetsFormProps = {
    defaultBudgets: UserBudget;
    handleSubmitBudget: (userBudgetsToSet: UserBudget) => void;
    userBudget: UserBudget| undefined;
}
const SetsBudgetsForm = ({defaultBudgets, handleSubmitBudget, userBudget}: SetsBudgetsFormProps ) => {
    const [userBudgetsToSet, setUserBudgetsToSet] = useState<UserBudget>(defaultBudgets)

  const handleInput= (event: FormEvent<HTMLInputElement>, key: string) => {
    setUserBudgetsToSet({...userBudgetsToSet, [key]: event.currentTarget.value})
  }

  const handleValidation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userBudgetsToSet.monthlyIncome == 0) {
        console.log("need income")
    } else {
        handleSubmitBudget(userBudgetsToSet)
    }
  };
  

  return (
    <div>
      <form className="sets-budgets-form" onSubmit={handleValidation}>
        <h1 className="sets-budgets-form__heading">Set Budgets</h1>
        <p className="sets-budgets-form__subheading">Monthly Income:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder={`£${userBudget ? userBudget.monthlyIncome : 0}`}
          onInput={(event) => handleInput(event, "monthlyIncome")}
        />
        <p className="sets-budgets-form__subheading">Bills:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder={`£${userBudget ? userBudget.bills : 0}`}
          onInput={(event) => handleInput(event, "bills")}
        />
        <p className="sets-budgets-form__subheading">Transport:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder={`£${userBudget ? userBudget.transport : 0}`}
          onInput={(event) => handleInput(event, "transport")}
        />
        <p className="sets-budgets-form__subheading">Groceries:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder={`£${userBudget ? userBudget.groceries : 0}`}
          onInput={(event) => handleInput(event, "groceries")}
        />
        <p className="sets-budgets-form__subheading">Health:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder={`£${userBudget ? userBudget.health : 0}`}
          onInput={(event) => handleInput(event, "health")}
        />
        <p className="sets-budgets-form__subheading">Eating out:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder={`£${userBudget ? userBudget.eatingOut : 0}`}
          onInput={(event) => handleInput(event, "eatingOut")}
        />
        <p className="sets-budgets-form__subheading">Entertainment:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder={`£${userBudget ? userBudget.entertainment : 0}`}
          onInput={(event) => handleInput(event, "entertainment")}
        />
        <p className="sets-budgets-form__subheading">Gifts:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder={`£${userBudget ? userBudget.gifts : 0}`}
          onInput={(event) => handleInput(event, "gifts")}
        />
        <p className="sets-budgets-form__subheading">Shopping:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder={`£${userBudget ? userBudget.shopping : 0}`}
          onInput={(event) => handleInput(event, "shopping")}
        />
        <Button label="Submit" color="primary" size="small" />
      </form>
    </div>
  );
};

export default SetsBudgetsForm;
