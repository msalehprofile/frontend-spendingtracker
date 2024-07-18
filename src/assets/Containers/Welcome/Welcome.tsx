import Button from '../../Components/Button/Button';
import './Welcome.scss';
import { Link } from 'react-router-dom'

type WelcomeProps = {
  brandName: string;
}

const Welcome = ({brandName}: WelcomeProps) => {
  return (
    <div className="welcomePage">
        <h2 className="welcomePage__name">{brandName}</h2>
        <div className="welcomePage__buttons">
            <Link to="/login"><Button label="Log in" color="primary" size="large"/></Link>
            <Link to="/createuser"><Button label="Sign Up" color="secondary" size="large"/></Link>            
        </div>
    </div>
  )
}

export default Welcome