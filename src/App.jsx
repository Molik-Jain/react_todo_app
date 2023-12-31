
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";
function App() {

const {setUser,setIsAuthenticated,setLoading}  =useContext(Context);

useEffect(() => {
  setLoading(true);
  axios.get(`${server}/users/me`,{
    withCredentials:true,
  }).then((res)=>{
    setUser(res.data.user);
    setIsAuthenticated(true);
    setLoading(false);
  }).catch((error)=>{
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
  })
}, [])
  

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster></Toaster>
    </Router>
    
  );
}

export default App

