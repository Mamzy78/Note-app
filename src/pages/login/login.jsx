import React, { useState } from "react";
import Btn from "../../components/button/btn";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  function clickHandler() {
    localStorage.setItem("userPhoneNumber", userPhoneNumber);
    navigate("/verification");
  }

  function isValidPhoneNumber(phone) {
    return /^09\d{9}$/.test(phone);
  }

  return (
    <div className="flex flex-col justify-center bg-light-grey h-screen max-w-md mx-auto relative border px-4">
      <div className="mb-20">
        <h1 className="text-4xl mb-4 font-InterBold">Let's Login</h1>
        <h2 className="text-slate-500">And notes your idea</h2>
      </div>
      <div>
        <p className="mb-3 font-InterMedium">Mobile Number</p>
        <input
          type="tel"
          value={userPhoneNumber}
          placeholder="Example: 09122165885"
          className="outline-none p-4 border-2 border-gray-300 rounded-lg w-full"
          onChange={(e) => setUserPhoneNumber(e.target.value)}
        />
      </div>
      <div className="absolute bottom-14 right-0 w-full px-4">
        <Btn
          className={
            "bg-purple-color-app text-white font-InterMedium disabled:bg-gray-button disabled:text-gray-300"
          }
          onClick={clickHandler}
          disabled={!isValidPhoneNumber(userPhoneNumber)}
        >
          Send Code
        </Btn>
      </div>
    </div>
  );
}

export default Login;
