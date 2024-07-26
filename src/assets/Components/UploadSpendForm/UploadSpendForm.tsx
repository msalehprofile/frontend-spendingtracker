import { FormEvent } from "react";
import "./UploadSpendForm.scss";
import Button from "../Button/Button";

type UploadSpendFormProps = {
  handleInput: (event: FormEvent<HTMLInputElement>, key: string) => void;
  incompletedData: boolean;
  handleSelect: (event: FormEvent<HTMLSelectElement>, key: string) => void;
  handleCollateData : () => void;
};
const UploadSpendForm = ({
  handleInput,
  incompletedData,
  handleSelect,
  handleCollateData
}: UploadSpendFormProps) => {

  const handleValidation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCollateData()
  };

  return (
    <>
      <form className="submit-spend-form" action="" onSubmit={handleValidation}>
        <h1 className="submit-spend-form__heading">Submit Spend</h1>
        <p className="submit-spend-form__subheading">Amount Spent:</p>
        <input
          type="text"
          placeholder="£0"
          className="submit-spend-form__input"
          onInput={(event) => handleInput(event, "amount")}
        />
        <p className="submit-spend-form__subheading">Vendor:</p>
        <input
          type="text"
          placeholder="Vendor"
          className="submit-spend-form__input"
          onInput={(event) => handleInput(event, "vendor")}
        />
        <p className="submit-spend-form__subheading">Category:</p>
        <select className="submit-spend-form__input" onChange={(event) => handleSelect(event, "category")}>
          <option value="select">Select</option>
          <option value="bills">Bills</option>
          <option value="transport">Transport</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="eatingOut">Eating Out</option>
          <option value="entertainment">Entertainment</option>
          <option value="gifts">Gifts</option>
          <option value="shopping">Shopping</option>
        </select>
        <p className="submit-spend-form__subheading">Date:</p>
        <input
          type="date"
          className="submit-spend-form__input"
          onInput={(event) => handleInput(event, "date")}
        />
        <Button label="Submit" size="small" color="primary" />
        {incompletedData && (
          <p className="create-user-form__error">
            Please fill in all data fields.
          </p>
        )}
      </form>
    </>
  );
};

export default UploadSpendForm;
