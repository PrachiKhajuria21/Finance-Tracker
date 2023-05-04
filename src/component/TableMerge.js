import react from "react";
import { useState } from "react";
import TableData from "./TableData";

export default function TableMerge() {
  const getDataFromLS = JSON.parse(localStorage.getItem("Data"));
  console.log("formData", getDataFromLS);

  const [allData, setAllData] = useState(getDataFromLS);
  const [groupBy, setGroupBy] = useState({});

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

  const selectClass ={
    marginLeft:"5%"
  }

  console.log("groupBy:::::::: ", groupBy);
  //   const length = Object.keys(groupBy).length;
  //   console.log("length:::: ", length);

  return (
    <>
      <select  style={selectClass} defaultValue="" onChange={handleGroup}>
        <option>none</option>
        <option value="month">Month-year</option>
        <option value="transactionType">Transaction-type</option>
        <option value="fromAccount">From Account</option>
        <option value="toAccount">To Account</option>
      </select>

      {/* <TableData data={allData} setData={setAllData} /> */}

      {Object.keys(groupBy).length > 0 &&
        Object.keys(groupBy).map((data, index) => (
          <TableData key={index} data={groupBy[data]} setData={setAllData} />
      ))}
    </>
  );
}
