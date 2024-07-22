import { FormEvent, useState } from "react";
import "./SetsBudgetsForm.scss";
import Button from "../Button/Button";
import { UserBudget } from "../../DataTypes/DataTypes";

type SetsBudgetsFormProps = {
    defaultBudgets: UserBudget;
    handleSubmitFirstBudget: (userBudgetsToSet: UserBudget) => void;
}
const SetsBudgetsForm = ({defaultBudgets, handleSubmitFirstBudget}: SetsBudgetsFormProps ) => {
    const [userBudgetsToSet, setUserBudgetsToSet] = useState<UserBudget>(defaultBudgets)

  const handleInput= (event: FormEvent<HTMLInputElement>, key: string) => {
    setUserBudgetsToSet({...userBudgetsToSet, [key]: event.currentTarget.value})
  }

  const handleValidation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userBudgetsToSet.monthlyIncome == 0) {
        console.log("need income")
    } else {
        handleSubmitFirstBudget(userBudgetsToSet)
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
          placeholder="£0"
          onInput={(event) => handleInput(event, "monthlyIncome")}
        />
        <p className="sets-budgets-form__subheading">Bills:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder="£0"
          onInput={(event) => handleInput(event, "bills")}
        />
        <p className="sets-budgets-form__subheading">Transport:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder="£0"
          onInput={(event) => handleInput(event, "transport")}
        />
        <p className="sets-budgets-form__subheading">Eating out:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder="£0"
          onInput={(event) => handleInput(event, "eatingOut")}
        />
        <p className="sets-budgets-form__subheading">Entertainment:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder="£0"
          onInput={(event) => handleInput(event, "entertainment")}
        />
        <p className="sets-budgets-form__subheading">Gifts:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder="£0"
          onInput={(event) => handleInput(event, "gifts")}
        />
        <p className="sets-budgets-form__subheading">Shopping:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder="£0"
          onInput={(event) => handleInput(event, "shopping")}
        />
        <p className="sets-budgets-form__subheading">Groceries:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder="£0"
          onInput={(event) => handleInput(event, "groceries")}
        />
        <p className="sets-budgets-form__subheading">Health:</p>
        <input
          type="text"
          className="sets-budgets-form__input"
          placeholder="£0"
          onInput={(event) => handleInput(event, "health")}
        />
        <Button label="Submit" color="primary" size="small" />
      </form>
    </div>
  );
};

export default SetsBudgetsForm;
