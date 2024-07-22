import "./MainApp.scss";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import UploadSpendPage from "../UploadSpendPage/UploadSpendPage";
import CreateUser from "../CreateUser/CreateUser";
import LogInPage from "../LogInPage/LogInPage";
import { UserLogin, Users, SubmittedSpends, UserBudget } from "../../DataTypes/DataTypes";
import Trends from "../Trends/Trends";
import UserProfile from "../UserProfile/UserProfile";
import ShowBudgetPage from "../ShowBudgetPage/ShowBudgetPage";
import SetsBudgetsPage from "../SetBudgetsPage/SetsBudgetsPage";

const MainApp = () => {
  const brandName = "juniper";
  const [userFirstName, setUserFirstName] = useState<string>("Terry");
  const [userSecondName, setUserSecondName] = useState<string>("Smith");
  const [userEmail, setUserEmail] = useState<string>("test@test.com");
  const [userId, setUserId] = useState<number>(252);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);
  const [foundUser, setFoundUser] = useState<Users>();
  const [userPasswordEntered, setUserPasswordEntered] = useState<string>();
  const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);
  const [listOfUsersAllTimeSpends, setListOfUsersAllTimeSpends] =
    useState<SubmittedSpends[]>([]);
  const [usersCurrentMonthSpends, setUsersCurrentMonthSpends] = useState<
    SubmittedSpends[]
  >([]);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [amountSpentInCurrentMonth, setAmountSpentInCurrentMonth] =
    useState<number>(0);
  const [amountSpentLastMonthLFL, setAmountSpentLastMonthLFL] =
    useState<number>(0);
  const today = new Date();
  const [variance, setVariance] = useState<number>(0);
  const [spendEqualToLastMonth, setSpendEqualToLastMonth] =
    useState<boolean>(false);
  const [spendMoreThanLastMonth, setSpendMoreThanLastMonth] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const [userBillsSpent, setUserBillsSpent] = useState<string>("");
  const [userEatingOutSpent, setUserEatingOutSpent] = useState<string>("");
  const [userEntertainmentSpent, setUserEntertainmentSpent] =
    useState<string>("");
  const [userGiftsSpent, setUserGiftsSpent] = useState<string>("");
  const [userShoppingSpent, setUserShoppingSpent] = useState<string>("");
  const [userGroceriesSpent, setUserGroceriesSpent] = useState<string>("");
  const [userHealthSpent, setUserHealthSpent] = useState<string>("");
  const [userTransportSpent, setUserTransportSpent] = useState<string>("");
  const [userBudget, setUserBudget] = useState<UserBudget | undefined>();

  const handleSubmitLogIn = async (userLogin: UserLogin) => {
    setUserPasswordEntered(userLogin.password);
    const resp = await fetch(
      `http://localhost:8080/findUserByEmail/${userLogin.email}`
    );
    const data = await resp.json();
    setFoundUser(data);
  };

  const handleGetThisMonthsMoneySpent = async (userId: number) => {
    const resp = await fetch(
      `http://localhost:8080/calculateCurrentMonthSpends/${userId}`
    );
    const data = await resp.json();
    setAmountSpentInCurrentMonth(data);
  };

  const handleGetLastMonthsMoneySpent = async (userId: number) => {
    const resp = await fetch(
      `http://localhost:8080/calculateLastMonthSpends/${userId}`
    );
    const data = await resp.json();
    setAmountSpentLastMonthLFL(data);
  };

  const handleSubmitSpend = async (spendToSubmit: SubmittedSpends) => {
    await fetch("http://localhost:8080/addspend", {
      method: "POST",
      headers: { admin: "true", "Content-Type": "application/json" },
      body: JSON.stringify(spendToSubmit),
    });
    handleGetUserSpends(userId);
    handleGetUserCurrentMonthSpends(userId);
    handleGetThisMonthsMoneySpent(userId);
    handleGetLastMonthsMoneySpent(userId);
    handleGetUserBugdets(userId)
    setSpendsByCat();
    navigate("/dashboard");
  };

  const handleSignOut = () => {
    setUserLoggedIn(false);
    setUserFirstName("");
    setUserSecondName("");
    setUserId(0);
    setIncorrectPassword(false);
    setListOfUsersAllTimeSpends([]);
    setUserPasswordEntered("");
  };

  const passwordCheck = () => {
    if (foundUser && foundUser.email != undefined) {
      if (userPasswordEntered == foundUser.password) {
        setUserFirstName(foundUser.firstName);
        setUserSecondName(foundUser.secondName);
        setUserId(foundUser.id);
        setUserEmail(foundUser.email);
        setUserLoggedIn(true);
        setIncorrectPassword(false);
        navigate("/dashboard");
        handleGetUserSpends(userId);
        handleGetUserBugdets(userId)
        handleGetUserCurrentMonthSpends(userId);
        handleGetThisMonthsMoneySpent(userId);
        handleGetLastMonthsMoneySpent(userId);
      } else {
        setIncorrectPassword(true);
      }
    }
  };

  const defaultSpend = {
    amount: -1,
    vendor: "",
    category: "",
    date: "",
  };

  const handleGetUserSpends = async (userId: number) => {
    const resp = await fetch(
      `http://localhost:8080/findSpendsByUserId/${userId}`
    );
    const data = await resp.json();
    setListOfUsersAllTimeSpends(data);
  };

  const handleGetUserBugdets = async (userId: number) => {
    const resp = await fetch(
      `http://localhost:8080/findBudgetsByUserId/${userId}`
    );
    const data = await resp.json();
    setUserBudget(data);
  };

  const handleGetUserCurrentMonthSpends = async (userId: number) => {
    const resp = await fetch(
      `http://localhost:8080/findSpendsForCurrentMonth/${userId}`
    );
    const data = await resp.json();
    setUsersCurrentMonthSpends(data);
  };

  useEffect(() => {
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const days: number[] = [];

    for (let i = 0; i < lastDay.getDate(); i++) {
      days.push(i + 1);
    }

    setDaysInMonth(days);
  }, []);

  useEffect(() => {
    if (foundUser && userPasswordEntered) {
      passwordCheck();
    }
  }, [foundUser]);

  useEffect(() => {
    setVariance(
      Number(
        (
          (amountSpentInCurrentMonth / amountSpentLastMonthLFL - 1) *
          100
        ).toFixed(1)
      )
    );
  }, [amountSpentInCurrentMonth, amountSpentLastMonthLFL]);

  useEffect(() => {
    if (variance < 1 && variance > -1) {
      setSpendEqualToLastMonth(true);
    }

    if (variance > 1) {
      setSpendMoreThanLastMonth(true);
      setSpendEqualToLastMonth(false);
    } else {
      setSpendMoreThanLastMonth(false);
      setSpendEqualToLastMonth(false);
    }
  }, [usersCurrentMonthSpends]);

  const setSpendsByCat = () => {
    let shoppingSpends =0;
    let giftSpends =0;
    let billsSpend=0;
    let eatingOutSpends=0;
    let entertainmentSpends=0;
    let groceriesSpent=0;
    let healthSpent=0;
    let transportSpends=0;

    for (let i = 0; i < usersCurrentMonthSpends.length; i++) {
      if (
        usersCurrentMonthSpends[i].category.toLowerCase() == "shopping"
      ) {
        shoppingSpends += usersCurrentMonthSpends[i].amount
      }
      if (usersCurrentMonthSpends[i].category.toLowerCase() == "gifts") {
        giftSpends += usersCurrentMonthSpends[i].amount
      
      }
      if (usersCurrentMonthSpends[i].category.toLowerCase() == "transport") {
        transportSpends += usersCurrentMonthSpends[i].amount
      
      }
      if (usersCurrentMonthSpends[i].category.toLowerCase() == "bills") {
        billsSpend += usersCurrentMonthSpends[i].amount
      }
      if (
        usersCurrentMonthSpends[i].category.toLowerCase() == "groceries"
      ) {
        groceriesSpent += usersCurrentMonthSpends[i].amount
        
      }
      if (
        usersCurrentMonthSpends[i].category.toLowerCase() == "health"
      ) {
        healthSpent += usersCurrentMonthSpends[i].amount
      }
      if (
        usersCurrentMonthSpends[i].category.toLowerCase() ==
        "entertainment"
      ) {
        entertainmentSpends += usersCurrentMonthSpends[i].amount
      }
      if (
        usersCurrentMonthSpends[i].category == "Eating Out"
      ) {
        eatingOutSpends += usersCurrentMonthSpends[i].amount
      }

    }
    setUserShoppingSpent((Number(shoppingSpends).toFixed(2)))
    setUserEatingOutSpent((Number(eatingOutSpends).toFixed(2)))
    setUserGiftsSpent((Number(giftSpends).toFixed(2)))
    setUserBillsSpent((Number(billsSpend).toFixed(2)))
    setUserGroceriesSpent((Number(groceriesSpent).toFixed(2)))
    setUserHealthSpent((Number(healthSpent).toFixed(2)))
    setUserEntertainmentSpent((Number(entertainmentSpends).toFixed(2)))
    setUserTransportSpent((Number(transportSpends).toFixed(2)))
  }
  
  useEffect(() => {
    setSpendsByCat()
  }, [variance]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome brandName={brandName} />} />
        <Route path="/createuser" element={<CreateUser brandName={brandName}/>} />
        <Route
          path="/login"
          element={
            <LogInPage
              handleSubmitLogIn={handleSubmitLogIn}
              incorrectPassword={incorrectPassword}
            />
          }
        />
        {userLoggedIn ? (
          <>
            <Route
              path="/dashboard"
              element={
                <Trends
                  daysInMonth={daysInMonth}
                  usersCurrentMonthSpends={usersCurrentMonthSpends}
                  today={today}
                  listOfUsersAllTimeSpends={listOfUsersAllTimeSpends}
                  brandName={brandName}
                  amountSpentInCurrentMonth={amountSpentInCurrentMonth}
                  variance={variance}
                  spendEqualToLastMonth={spendEqualToLastMonth}
                  spendMoreThanLastMonth={spendMoreThanLastMonth}
                />
              }
            />
            <Route
              path="/uploadspend"
              element={
                <UploadSpendPage
                  defaultSpend={defaultSpend}
                  userId={userId}
                  handleSubmitSpend={handleSubmitSpend}
                  brandName={brandName}
                />
              }
            />
            <Route
              path="/myprofile"
              element={
                <UserProfile
                  userFirstName={userFirstName}
                  userSecondName={userSecondName}
                  userEmail={userEmail}
                  handleSignOut={handleSignOut}
                  brandName={brandName}
                />
              }
            />
            <Route
              path="/budgets"
              element={
                <ShowBudgetPage
                  brandName={brandName}
                  amountSpentInCurrentMonth={amountSpentInCurrentMonth}
                  userHealthSpent={userHealthSpent}
                  userGroceriesSpent={userGroceriesSpent}
                  userShoppingSpent={userShoppingSpent}
                  userGiftsSpent={userGiftsSpent}
                  userBillsSpent={userBillsSpent}
                  userEatingOutSpent={userEatingOutSpent}
                  userEntertainmentSpent={userEntertainmentSpent}
                  userTransportSpent={userTransportSpent}
                  today={today}
                  userBudget={userBudget}
                />
              }
            />
            <Route
              path="/setsbudgets"
              element={
                <SetsBudgetsPage brandName={brandName} userId={userId} />
              }
            />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </>
  );
};

export default MainApp;
