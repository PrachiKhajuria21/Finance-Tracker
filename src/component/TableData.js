import PageMeta from "./TableComponent";
import react, { useEffect, useState } from "react";

export default function TableData({ data, setData }) {
  const getDataFromLS = JSON.parse(localStorage.getItem("Data"));

  // const [newState, setNewData] = useState(getDataFromLS);

  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState([]);
  const [typeSearch, setTypeSearch] = useState("");
  
  const records = 5;
  const totalRecords = data.length;

  let pages = Math.ceil(totalRecords / records);
  let pageNumber = [...Array(pages + 1).keys()].slice(1);
 
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = records * currentPage;
  const indexOfFirst = indexOfLast - records;

  console.log(indexOfFirst, indexOfLast);

  const HandleSort = (getname) => {
    console.log("handle sort:::::: ", search.length);
    if (order === "asc") {
      if (search.length !== 0) {
        sortFunctionasc(getname, search);
        // console.log("order", order);
        return;
      }
      sortFunctionasc(getname, data);
    } else if (order === "desc") {
      if (search.length !== 0) {
        sortFunctionasc(getname, search);
      }
      sortFunctiondesc(getname, data);
    } else {
      if (search.length !== 0) {
        setData(search);
        setOrder("desc");
      }
      setData(data);
      setOrder("asc");
    }
  };

  const sortFunctionasc = (getname, param) => {
    const sortedArr = param.sort((a, b) => (a[getname] < b[getname] ? -1 : 1));
    setData(sortedArr);
    setOrder("desc");
    console.log("inside function:: ", order);
    return;
  };

  const sortFunctiondesc = (getname, param) => {
    const sortedArr = param.sort((a, b) => (a[getname] > b[getname] ? -1 : 1));
    setData(sortedArr);
    // console.log("inside function:: ", order);
    setOrder(" ");
  };

  const handlePagination = (number) => {
    setCurrentPage(number);
  };

  const handleSelect = (e) => {
    // console.log("", e.target.value);
  };

  const mystyle = {
    border: "2px solid green",
    margin: "auto",
  };

  const searchClass = {
    marginBottom: "20px",
    marginLeft: "20%",
    marginTop: "30px",
    color: "red",
    fontWeight: "bold",
  };

  const handleSearch = (event) => {
    setTypeSearch(event.target.value);
    if (event.target.value.length === 0) {
      setTypeSearch("");
      setSearch("");
      setData([...data.slice(indexOfFirst, indexOfLast)]);
      return;
    }

 
    const cloneData = [...data];
    const searchValue = event.target.value;
    const searchRes = cloneData.filter((curData) => {
      if (
        curData.month.includes(searchValue) ||
        curData.date.includes(searchValue) ||
        curData.transactionType.includes(searchValue) ||
        curData.fromAccount.includes(searchValue) ||
        curData.toAccount.includes(searchValue) ||
        curData.amount.includes(searchValue) ||
        curData.notes.includes(searchValue)
      ) {
        console.log("curData::::::: ", curData);
        return curData;
      } else {
        return "";
      }
    });

    setSearch(searchRes);
    // console.log("search Result", search);
    setData([]);
    // console.log("data::::::::::::::: ")
  };

  const pageBottom = {
    border:"1px solid red",
    backgroundColor:"red",
    fontWeight:"bold",
    color:"white"
  }


  return (
    <div>
      <div>
        <label style={searchClass}>Search</label>
        <input type="text" onChange={handleSearch} />
      </div>
      <div className="dropDown" onChange={handleSelect}></div>
      <table style={mystyle}>
        <tbody>
          <tr>
            <th>ID</th>
            <th onClick={() => HandleSort("date")}>Transaction Date</th>
            <th onClick={() => HandleSort("month")}>Month Year</th>
            <th onClick={() => HandleSort("transactionType")}>
              Transaction Type
            </th>
            <th onClick={() => HandleSort("fromAccount")}>From Account</th>
            <th onClick={() => HandleSort("toAccount")}>To Account</th>
            <th onClick={() => HandleSort("amount")}>Amount</th>
            <th>Receipt</th>
            <th onClick={() => HandleSort("notes")}>Notes</th>
            <td>Action</td>
          </tr>

          {data.length > 0 && search.length === 0 && (
            <PageMeta data={data.slice(indexOfFirst, indexOfLast)} />
          )}

          {search.length > 0 && <PageMeta data={search} />}
        </tbody>
      </table>
      <div>
        {data.length > 0 &&
          pageNumber.map((number) => (
            <span style={pageBottom} key={number} onClick={() => handlePagination(number)}>
              {number}
            </span>
          ))}
      </div>
    </div>
  );
}
