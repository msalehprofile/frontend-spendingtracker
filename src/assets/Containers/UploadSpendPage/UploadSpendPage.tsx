import "./UploadSpendPage.scss";
import Header from "../../Components/Header/Header";
import DashboardNav from "../../Components/DashboardNav/DashboardNav";
import UploadSpendForm from "../../Components/UploadSpendForm/UploadSpendForm";
import { EnteredSpend, SubmittedSpends } from "../../DataTypes/DataTypes";
import { useState, FormEvent } from "react";

type UploadSpendPageProps = {
  defaultSpend: EnteredSpend;
  userId: number;
  handleSubmitSpend: (handleSubmitSpend: SubmittedSpends) => void;
  brandName: string
};

const UploadSpendPage = ({ defaultSpend, userId, handleSubmitSpend, brandName }: UploadSpendPageProps) => {
  const [enteredSpend, setEnteredSpend] = useState<EnteredSpend>(defaultSpend);
  const [incompletedData, setIncompletedData] = useState<boolean>(false);

  const finalSpend = {
    id: -1,
    userId: userId,
    amount: enteredSpend.amount,
    vendor: enteredSpend.vendor,
    category: enteredSpend.category,
    date: enteredSpend.date,
  };

  const handleInput = (event: FormEvent<HTMLInputElement>, key: string) => {
    setEnteredSpend({ ...enteredSpend, [key]: event.currentTarget.value });
  };

  const handleSelect = (event: FormEvent<HTMLSelectElement>, key: string) => {
    setEnteredSpend({ ...enteredSpend, [key]: event.currentTarget.value });
  };

  const handleCollateData = () => {
    if (Object.values(enteredSpend).some((value) => !value)) {
      setIncompletedData(true);
    } else if(enteredSpend.category == "select") {
      setIncompletedData(true);
    } else {
      setIncompletedData(false);
      handleSubmitSpend(finalSpend)
    }
  };
  
  return (
    <div>
      <Header brandName={brandName}/>
      <UploadSpendForm
        handleInput={handleInput}
        incompletedData={incompletedData}
        handleSelect={handleSelect}
        handleCollateData={handleCollateData}
      />
      <DashboardNav />
    </div>
  );
};

export default UploadSpendPage;
