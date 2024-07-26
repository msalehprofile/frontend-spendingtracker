import { Link } from 'react-router-dom';
import './DashboardNav.scss';

const DashboardNav = () => {
  return (
    <div className="dashboard">
        <Link to="/frontend-spendingtracker/dashboard"><p className="dashboard__symbol">&#128200;</p></Link>
        <Link to="/frontend-spendingtracker/budgets"><p className="dashboard__symbol">&#65505;</p></Link>
        <Link to="/frontend-spendingtracker/uploadspend"><p className="dashboard__symbol">&#8682;</p></Link>
        <Link to="/frontend-spendingtracker/myprofile"><p className="dashboard__symbol">&#x2302;</p></Link>
    </div>
  )
}

export default DashboardNav