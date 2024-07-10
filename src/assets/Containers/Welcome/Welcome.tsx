import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (

    <div>
    <h2>track+</h2>
    <Link to="/login"><button>Log in</button></Link>
    <Link to="/createuser"><button>Sign Up</button></Link>
    </div>
  )
}

export default Welcome