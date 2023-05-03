import React from "react";

export default function DropDown({ data, name, setFormData }) {
  const handleValue = (e) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  return (
    <>
      <select
        className="form-control"
        onChange={handleValue}
        name={name}
        defaultValue={""}
      >
        <option value="" disabled>
          Select Answer
        </option>
        {data.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </>
  );
}
