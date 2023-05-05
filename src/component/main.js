import react from "react";
import { useState } from "react";
import TableData from "./TableData";
import { useNavigate } from "react-router-dom";


export default function TableMerge() {
  const getDataFromLS = JSON.parse(localStorage.getItem("Data"));
  console.log("formData", getDataFromLS);


  const [allData, setAllData] = useState(getDataFromLS);
  const [groupBy, setGroupBy] = useState({});
  const navigate = useNavigate();

  const handleGroup = (e) => {
    console.log(e.target.value);

    const get = getDataFromLS.reduce(function (a, b) {
      let key = b[e.target.value];
      if (!a[key]) {
        a[key] = [];
      }
      a[key].push(b);
      return a;
    }, {});
    setGroupBy(get);
    // setAllData([]);
  };


  const handleRemove = () =>
  {
    localStorage.removeItem("Token");
     navigate("/")
  }

  const selectClass ={
    marginLeft:"3%"
  }

  const btn = {
    color: "white",
    marginLeft:"50%",
    backgroundColor:"red",
    border:"1px solid red",
    fontWeight:"bold"
  };

  const label = {
     fontWeight:"bold",
     
  }
 
   const handleSignIn =() =>
   {
      navigate("/form")
   }
   const logout = {
    color: "white",
    marginLeft: "80%",
    backgroundColor: "red",
    border: "1px solid red",
    fontWeight: "bold",
   }
 

  return (
    <>
    <div>
    <button onClick={handleRemove} style={logout}>Logout</button>
    </div>
  

      <label style={label}>Check tables here:</label>
      <select  style={selectClass} defaultValue="" onChange={handleGroup}>

        <option>none</option>
        <option value="month">Month-year</option>
        <option value="transactionType">Transaction-type</option>
        <option value="fromAccount">From Account</option>
        <option value="toAccount">To Account</option>
      </select>

      <button style={btn} onClick={handleSignIn}>Add Details</button>
    

      {/* <TableData data={allData} setData={setAllData} /> */}

      {Object.keys(groupBy).length > 0 &&
        Object.keys(groupBy).map((data, index) => (
          <TableData key={index} data={groupBy[data]} setData={setAllData} />
      ))}
    </>
  );
}
