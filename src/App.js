import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import FormData from "./FormData";
// import TableData from "./TableData"
import TableData from "./component/TableData";
import FormData from "./component/FormData";
import TableMerge from "./component/TableMerge";
import "./index.css"

export default function App() {
  return (
    <div>
      <h1 className="text">Finance tracer</h1>
     <Router>
      <Routes>
        <Route exact index element={<FormData />}></Route>
        <Route exact path="/tabledata" element={<TableData />}></Route>
        <Route exact path="/allMerge" element={<TableMerge/>}></Route>
      </Routes>
    </Router>
    </div>
    
  );
}
