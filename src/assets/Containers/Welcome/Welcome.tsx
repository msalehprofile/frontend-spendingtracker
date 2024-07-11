import Button from '../../Components/Button/Button';
import './Welcome.scss';
import { Link } from 'react-router-dom'


const Welcome = () => {
  return (
    <div className="welcomePage">
        <h2 className="welcomePage__name">track+</h2>
        <div className="welcomePage__buttons">
            {/* <Link to="/login"><button className="welcomePage__buttons--login">Log in</button></Link>
            <Link to="/createuser"><button className="welcomePage__buttons--signin">Sign Up</button></Link> */}

            <Link to="/login"><Button label="Log in" color="primary" size="large"/></Link>
            <Link to="/createuser"><Button label="Sign Up" color="secondary" size="large"/></Link>
            
        </div>
    </div>
  )
}

export default Welcome