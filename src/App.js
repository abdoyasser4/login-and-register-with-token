import Signup from './pages/wepsite/Auth/signupPage';
import './index.css';
import { Route, Routes } from "react-router-dom";
import Login from './pages/wepsite/Auth/LoginPage';
import Home from "./pages/wepsite/HomePage";
import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from './pages/Dashboard/users/Users'
import UpdateUser from './pages/Dashboard/users/UpdateUser';
import Createuser from "./pages/Dashboard/users/Createuser";
import ProtectRoutes from './pages/wepsite/Auth/protectRoute';
import PersistLoging from './pages/wepsite/Auth/persistloging';
import Products from './pages/Dashboard/Products/Products';
import NewProducts from './pages/Dashboard/Products/NewProduct';
import UpdateProducts from './pages/Dashboard/Products/UpdateProduct';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route element={<PersistLoging />}>
          <Route element={<ProtectRoutes />}>
            <Route path="/Dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="user/create" element={<Createuser />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="products" element={<Products />} />
              <Route path="product/create" element={<NewProducts />} />
              <Route path="products/:id" element={<UpdateProducts />} />
            </Route>
          </Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
