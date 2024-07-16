import './App.scss'
import { BrowserRouter as Router } from "react-router-dom";
import MainApp from './assets/Containers/MainApp/MainApp';


function App() {
  return (
     <Router>
      <MainApp />
    </Router>
  );
}

export default App;
