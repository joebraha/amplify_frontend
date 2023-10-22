import React, { useState } from "react"; 
// importing Link from react-router-dom to navigate to  
// different end points. 
import { Link } from "react-router-dom"; 
import { useEffect } from "react";
  


//Put url of page to send prompt data to in action field below
const Prompt = () => { 


  return ( 
    <div> 
      <h1>Prompt</h1> 
      <br /> 
      <body>
        <form action="/" method="GET"> 
            <p>Please type in your song prompt below:</p>
            <input type="text"/>
        </form>
      </body>
    </div> 
  ); 
}; 
  
export default Prompt; 