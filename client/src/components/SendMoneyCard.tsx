import { useSearchParams } from "react-router-dom";
import { Heading } from "./Heading";
import { useState } from "react";
import axios from "axios";

export function SendMoneyCard() {
  const [searchParams] = useSearchParams();
  const userId = Number(searchParams.get("id"));
  const name = String(searchParams.get("name"));
  const [amount, setAmount] = useState(0);

  async function handleTransfer() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: userId,
          amount: amount,
        },
        {
          headers: {
            Authentication: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        alert(response.data.message);        
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-96 max-w-md bg-white p-6 rounded-lg shadow-lg  space-y-6">
      <Heading label="Send Money" />
      <div className="space-y-4 pt-6">
        <div className="flex  items-center gap-3">
          <div className="p-2 rounded-full  h-12 w-12 bg-green-500">
            <div className="flex justify-center items-center h-full text-xl uppercase">
              {name[0].toUpperCase()}
            </div>
          </div>
          <div className="text-lg font-semibold">{name}</div>
        </div>
        <div className="flex flex-col space-y-2 text-start">
          <label className="text-sm font-medium">Amount (in Rs)</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 shadow-md transition"
            onClick={handleTransfer}
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
