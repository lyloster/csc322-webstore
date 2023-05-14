import React from 'react';
//routing
import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages
import { HomePage } from './views/HomePage';
import { OwnerPage } from './views/OwnerPage';
import { EmployeePage } from './views/EmployeePage';
import { CustomerPage } from './views/CustomerPage';
import { CartPage } from './views/CartPage';
// TODO: implement Details page
import { SignIn } from './views/SignIn';
import { SignUp } from './views/SignUp';
import { AddWalletPage } from './views/AddWalletPage'

function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/:userId?/:buildId?" element={<HomePage/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/cart/:userId/:buildIds?/" element={<CartPage/>} /> 
            {/* <Route path="/details/build/:id" element={<DetailsBuildPage/>} />  */}
            {/* TODO: add id in owner, employee, customer, and addBalance pages  after creating the objects*/}
            <Route path="/owner" element={<OwnerPage/>} />
            <Route path="/employee" element={<EmployeePage/>} />
            <Route path="/customer" element={<CustomerPage/>} />
            <Route path="/customer/addBalance" element={<AddWalletPage/>} />
        </Routes>
      </BrowserRouter>
    );
  }
  
export default App;
