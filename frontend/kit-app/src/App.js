
import {Routes, Route} from "react-router-dom"
import Home from './components/Home';
import Display from "./components/Display"
import Header from './components/Header.js';
import Details from "./components/Details";
import Cart from './components/Cart';
import Register from "./components/Register"
import Login from "./components/Login"
import Orders from "./components/Orders.js";
import First from "./components/First.js";

import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 
  return (
    <div className="App">
<Header  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path ="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path ="/first" element={<First/>} />        
        <Route path="/home" element={<Home/>}/>
        <Route path ="/display/:club" element={<Display/>}/>
        <Route path ="/jersey-details" element={<Details/>}/>
        <Route path='/cart' element ={<Cart/>}/>
        

        <Route path ="/register" element={<Register/>}/>
        <Route path='/myorders' element ={<Orders/>}/>

      



      </Routes>
    
    
    </div>
  );
}

export default App;
