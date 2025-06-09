import React, { useState, useRef } from "react";
import Btn from "../../components/button/btn";
import { useNavigate } from "react-router-dom";
import Backbtn from "../../components/button/backbtn";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Verification() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    const correctOtp = "123456";
    const otpString = otp.join("");
    const isOtpCorrect = otpString === correctOtp;

    const handleOtpChange = (event, index) => {
        const value = event.target.value;
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const loginHandler = () => {
        if (isOtpCorrect) {
            navigate("/");
        }
    };

    const ClickHandler = () => {
        navigate("/login");
    };

    return (
        <div className="flex flex-col justify-center bg-light-grey h-screen max-w-md mx-auto relative px-4">
            <div className="flex absolute top-2 w-full h-12">
                <Backbtn onClick={ClickHandler}>
                    <p className="text-purple-color-app font-InterMedium">Back to Login</p>
                </Backbtn>
            </div>
            <div className="mb-16">
                <h1 className="text-[32px] mb-4 leading-10 font-InterBold">Enter Verification Code</h1>
                <h2 className="text-slate-500">Insert your code sent via SMS</h2>
            </div>
            <div>
                <p className="mb-3 font-InterMedium">OTP code</p>
                <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => inputRefs.current[index] = el}
                            type="tel"
                            maxLength="1"
                            placeholder="-"
                            className="placeholder-black p-4 border-2 border-purple-color-app rounded-lg max-w-12 text-center"
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>
            </div>
            <div className="absolute bottom-14 right-0 w-full px-4">
                <Btn 
                    className={isOtpCorrect ? 'bg-purple-color-app text-white font-InterMedium' : 'bg-gray-300 text-white'}
                    onClick={loginHandler}
                    disabled={!isOtpCorrect}
                >
                    Login
                </Btn>
            </div>
        </div>
    );
}

export default Verification;