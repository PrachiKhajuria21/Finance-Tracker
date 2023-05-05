import { ErrorResponse } from "@remix-run/router";
import React,{useEffect, useState} from "react";


export default function Login()
{
    const INITIAL_STATE = {
        email: "",
        password: "",
    }

    const [loginData,setLoginData] = useState(INITIAL_STATE);
    const handleValue = (e) =>
    {
        setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    console.log("emailData::::",loginData)

    let error = {};
    const [validation, setValidation] = useState({});
    const validate = (value) =>
    {
       if(!value.email)
       {
         error.email="email required";
       }
       if(!value.password)
       {
        error.password = "password required";
       }

       return error;
    }

    const handleSubmit = (e) =>
    {
         e.preventDefault();
         console.log("Insideeeeeeee")
         const errFunc = validate(loginData);
         setValidation(errFunc);

      const errorLength = Object.values(errFunc).filter((item) => item !== "");
      console.log("error length", errorLength.length);

      if (errorLength.length === 0) {
        
        console.log("errorrrrrrr not occured");
      }
      else{
        console.log("errorrrrrrr occured");
      }
    }

    
     
   const myvariable = {
    color:"red"
   }
   const userLogin ={
    color:"red",
    marginLeft:"40%"
   }
   const userForm = {
    marginLeft:"35%",
    marginTop:"2%"
   }


    return(
       <div>

       <h2 style={userLogin}>Login Page</h2>
        <form onSubmit={handleSubmit} style={userForm}>
            <div className="form-group mt-2">
            <label>Email: </label>
            <input type="text" name="email" onChange={handleValue}/>
            </div>
            <p style={myvariable}>{validation.email}</p>
            <div className="form-group mt-2">
            <label>Password: </label>
            <input type="text"  name="password"onChange={handleValue}/>
            <p style={myvariable}>{validation.password}</p>
            </div>
            <button type="submit"  className="btn btn-primary" >
            Submit
            </button>
        </form>
        </div>
    )
}