
import {Routes, Route} from "react-router-dom"
import Home from './components/home/Home.js';
import Display from "./components/jerseys/display/Display.js"
import Header from './components/header/Header.js';
import Details from "./components/jerseys/details/Details.js";
import Cart from './components/Cart/Cart.js';
import Register from "./components/auth/register/Register.js"
import Login from "./components/auth/login/Login.js"
import Orders from "./components/orders/Orders.js";
import Results from "./components/Results.js";
import Success from "./pages/Success.js"

import { useState } from "react";
import Checkout from "./components/payment/Checkout.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Move searchTerm state here
  const [filters, setFilters] = useState({ type: '', rating: 0, minPrice: 0, maxPrice: 1000 });

 
  return (
    <div className="App">
<Header  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path ="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/home" element={<Home />}/>
        <Route path ="/display/:club" element={<Display/>}/>
        <Route path ="/jersey-details" element={<Details/>}/>
        <Route path='/cart' element ={<Cart/>}/>
        <Route path="/results" element={<Results />} /> {/* Add the Results route */}


        <Route path ="/register" element={<Register/>}/>
        <Route path='/myorders' element ={<Orders/>}/>
        <Route path='/checkout' element ={<Checkout/>}/>
        <Route path='/checkout' element ={<Checkout/>}/>
        <Route path='/success' element ={<Success/>}/>


      



      </Routes>
    
    
    </div>
  );
}

export default App;
