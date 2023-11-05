import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from "./components/shared/NavBar.jsx" 
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {

  return (
    <div className="App">

<NavBar/>
<Outlet/>

    </div>
  );
}

export default App;
