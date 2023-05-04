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
          Select Option
        </option>
        {data.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
    </>
  );
}
