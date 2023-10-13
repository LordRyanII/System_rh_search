import React from "react";
import Header from "./Header";
import '../../../assets/css/HomeContent.css';
import Login from "./IconLogin";
import Button from "./ButtonLogin";


function Main() {
  
    return (
      <div className="home-content">
        <Header />
        <Login />
        <Button/>
        
      </div>
    );
  }

export default Main