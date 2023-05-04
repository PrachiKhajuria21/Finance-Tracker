import react,{ useState} from "react";
import TableData from "./TableData";
import { useNavigate } from "react-router-dom";

export default function PageMeta({ data }) {


  const navigate = useNavigate();

  const handleEdit = (index) => {
    console.log("index::::::",index)
    // const userData = data.find(({ id }) => id === index); 
    // console.log( "userData::::",userData );
    navigate("/form",{state:index})
  };

  return (
    <>
      {data.length > 0 &&
        data.map((data, index) => (
          <tr key={index}>
            <td>{data.id}</td>
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
              <button onClick={() => handleEdit(data.id)}>Edit</button>
            </td>
          </tr>
        ))}
    </>
  );
}
