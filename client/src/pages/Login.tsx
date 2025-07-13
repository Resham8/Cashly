import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin() {
    const res = await axios.post("http://localhost:3000/api/v1/user/login", {
      username,
      password,
    });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard")
  }
  return (
    <>
      <div className="flex justify-center items-center bg-slate-300 h-screen w-screen">
        <div className="w-80 bg-white rounded-xl text-center h-max px-6 py-3">
          <Heading label="LogIn" />
          <SubHeading label="Enter your credentials to access your account" />
          <InputBox
            label="Email"
            placeholder="example@gmail.com"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            label="password"
            placeholder="123456"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button label={"LogIn"} onClick={handleLogin} />
          <BottomWarning
            label="Didn't have an account?"
            text="Sign Up"
            to="/signup"
          />
        </div>
      </div>
    </>
  );
}
