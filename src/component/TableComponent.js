import react from "react";
import TableData from "./TableData";

export default function PageMeta({ data }) {
  return (
    <>
      {data.length > 0 &&
        data.map((data, index) => (
          <tr key={index}>
            <td>{data.date}</td>
            <td>{data.month}</td>
            <td>{data.transactionType}</td>
            <td>{data.fromAccount}</td>
            <td>{data.toAccount}</td>
            <td>{data.amount}</td>
            <td>
              <img src={data.receipt} alt="test" />
            </td>
            <td>{data.notes}</td>
            <td>
              <button>view</button>
            </td>
          </tr>
        ))}
    </>
  );
}
