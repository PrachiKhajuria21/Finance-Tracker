import react, { useEffect, useForm, useState } from "react";
import DropDown from "./DropDown";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function FormData() {
  const INITIAL_STATE = {
    date: "",
    month: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    amount: "",
    receipt: "",
    receiptSize: 0,
    notes: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [validation, setValidation] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  let errors = {};
  const handleValue = (e) => {
    if (e.target.name === "receipt") {
      let fileSize = e.target.files[0].size;
      setFormData((prev) => ({ ...prev, receiptSize: fileSize }));
      console.log("1- ", e.target.value);
      var filePath = e.target.value;
      if (!filePath.match(/\.(jpg|jpeg|png|gif)$/)) {
        alert("enter valid image");
      }
      // console.log("2- ",e.)
      else {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            receipt: reader.result.toString(),
          }));
        };
        reader.readAsDataURL(file);
      }
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (value) => {
    if (!value.date) {
      errors.date = "Date is required";
    }
    if (!value.month) {
      errors.month = "Month is required";
    }

    if (!value.transactionType) {
      errors.transactionType = "Transaction Type is required";
    }
    if (!value.fromAccount) {
      errors.fromAccount = "From Account is required";
    }

    if (!value.toAccount) {
      errors.toAccount = "To Account is required";
    } else if (value.toAccount === value.fromAccount) {
      errors.toAccount = "Both the accounts are not same";
    }

    if (!value.amount || value.amount === 0) {
      errors.amount = "Amount is required and should be greater than 0";
      console.log("amounnt::", value.amount);
    }

    if (!value.receipt) {
      errors.receipt = "Receipt is required";
    }
    // else if (!value.receipt.match(/\.(jpg|jpeg|png|gif)$/)) {
    //   errors.receipt = "select valid image";
    // }
    if (value.receiptSize > 1024 * 1024) {
      errors.receipt = "Limit exceeded";
    }

    if (!value.notes || value.notes.length > 250) {
      errors.notes = "invalid notes length or notes are not required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidation(validate(formData));
    setIsSubmit(true);
    console.log(formData);

    let array = JSON.parse(localStorage.getItem("Data") || "[]");
    array.push(formData);
    localStorage.setItem("Data", JSON.stringify(array));

    console.log("Array::::", array);
  };

  useEffect(() => {
    console.log("new validate data::: ", validation);
    if (Object.keys(validation).length === 0 && isSubmit) {
      console.log(validation);
    }
  }, []);

  const myvariable = {
    color: "red",
  };

  return (
    <div className="container">
      <span>
        <Link to="/tabledata">
          <button>View</button>
        </Link>
      </span>

      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label>Transaction Data: </label>
          <input
            type="date"
            className="form-control"
            onChange={handleValue}
            name="date"
          />
        </div>
        <p style={myvariable}>{validation.date}</p>
        <div className="form-group mt-2">
          <label>Month-year: </label>
          <DropDown
            data={[
              "january",
              "febrary",
              "march",
              "april",
              "may",
              "june",
              "july",
              "august",
              "september",
              "october",
              "november",
              "december",
            ]}
            name="month"
            setFormData={setFormData}
          />
        </div>
        <p style={myvariable}>{validation.month}</p>
        <div className="form-group mt-2">
          <label>Transaction Type: </label>
          <DropDown
            data={["Home Expense", "Personal Expense", "Income Expense"]}
            name="transactionType"
            setFormData={setFormData}
          />
        </div>
        <p style={myvariable}>{validation.transactionType}</p>
        <div className="form-group mt-2">
          <label>From Account: </label>
          <DropDown
            data={[
              "Personal Account",
              "Real Living",
              "My Dream Home",
              "Full Circle",
              "Core Realtors",
              "Big Block",
            ]}
            name="fromAccount"
            setFormData={setFormData}
          />
        </div>
        <p style={myvariable}>{validation.fromAccount}</p>
        <div className="form-group mt-2">
          <label>To Account: </label>
          <DropDown
            data={[
              "Personal Account",
              "Real Living",
              "My Dream Home",
              "Full Circle",
              "Core Realtors",
              "Big Block",
            ]}
            name="toAccount"
            setFormData={setFormData}
          />
        </div>
        <p style={myvariable}>{validation.toAccount}</p>
        <div className="form-group mt-2">
          <label>Amount: </label>
          <input
            type="number"
            className="form-control"
            onChange={handleValue}
            name="amount"
          />
        </div>
        <p style={myvariable}>{validation.amount}</p>
        <div className="form-group mt-2">
          <label>Receipt: </label>
          <div className="col-sm-18">
            <input
              type="file"
              className="form-control-file"
              onChange={handleValue}
              name="receipt"
            />
          </div>
        </div>
        <p style={myvariable}>{validation.receipt}</p>
        <div className="form-group mt-2">
          <label>Notes: </label>
          <input
            type="textarea"
            className="form-control"
            onChange={handleValue}
            name="notes"
          />
        </div>
        <p style={myvariable}>{validation.notes}</p>

        <div className="mt-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
