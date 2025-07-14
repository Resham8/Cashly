import axios from "axios";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { UsersComponents } from "../components/UsersComponents";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [balance, setBalance] = useState("");

  async function getBalance() {
    const response = await axios.get(
      "http://localhost:3000/api/v1/account/balance",
      {
        headers: {
          Authentication: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setBalance(response.data.balance);
  }
  useEffect(() => {
    getBalance();
  }, [balance]);

  return (
    <div
      className="h-screen w-screen bg-[linear-gradient(135deg,_#e2ecf3,_#cfe7f1,_#b3dfee)]

"
    >
      <AppBar />
      <div className="px-96">
        <Balance value={balance} />
        <UsersComponents />
      </div>
    </div>
  );
}
