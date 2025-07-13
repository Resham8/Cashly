import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password,
      });
      if(res.data){
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center bg-slate-300 h-screen w-screen">
        <div className="w-80 bg-white rounded-xl text-center h-max px-6 py-3">
          <Heading label="Sign Up" />
          <SubHeading label="Enter your information to create an account" />
          <InputBox
            label="First Name"
            placeholder="John"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            label="Last Name"
            placeholder="Doe"
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <Button label={"Sign Up"} onClick={handleSignup} />
          <BottomWarning
            label="Already have an account?"
            text="Login"
            to="/login"
          />
        </div>
      </div>
    </>
  );
}
