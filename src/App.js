import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import FormData from "./FormData";
// import TableData from "./TableData"
import TableData from "./component/TableData";
import FormData from "./component/FormData";
import TableMerge from "./component/main";
import Login from "./component/login";
import "./index.css"
import Registration from "./component/registration";

export default function App() {



  return (
    <div>
      <h1>Finance tracker</h1>
     <Router>
      <Routes>
        <Route exact path="/form" index element={<FormData />}></Route>
        <Route exact path="/tabledata" element={<TableData />}></Route>
        <Route exact path="/" element={<TableMerge/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/reg" element={<Registration/>}></Route>
      </Routes>
    </Router>
    </div>
    
  );
}
