import { FormEvent } from 'react';
import './SetsBudgetsPage.scss';
import DashboardNav from '../../Components/DashboardNav/DashboardNav';
import Header from '../../Components/Header/Header';
import SetsBudgetsForm from '../../Components/SetsBugdetsForm/SetsBudgetsForm';

type SetsBudgetsPageProps = {
    brandName: string;
    userId: number;
}

const SetsBudgetsPage = ({brandName, userId}: SetsBudgetsPageProps) => {

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
   }

  return (
    <div>
        <Header brandName={brandName}/>
        <SetsBudgetsForm defaultBudgets={defaultBudgets}/>
        <DashboardNav />
    </div>
  )
}

export default SetsBudgetsPage