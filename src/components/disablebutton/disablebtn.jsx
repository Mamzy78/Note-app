import React, { useState, useEffect } from 'react';
import Btn from '../button/btn'; // Adjust the import path as needed

function OTPInputComponent() {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isButtonActive, setIsButtonActive] = useState(false);

  // Effect to check if all inputs are filled and enable the button
  useEffect(() => {
    const isAllFilled = otp.every((num) => num.trim() !== '');
    setIsButtonActive(isAllFilled);
  }, [otp]);

  const handleChange = (event, index) => {
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);

    // Auto-focus next input field
    if (event.target.value.trim() !== '' && index < 5) {
      const nextField = document.getElementById(`otp-${index + 1}`);
      if (nextField) {
        nextField.focus();
      }
    }
  };

  return (
    <div>
      {otp.map((num, index) => (
        <input
          key={index}
          type="text"
          id={`otp-${index}`}
          maxLength="1"
          value={num}
          onChange={(e) => handleChange(e, index)}
          onFocus={(e) => e.target.select()}
          // Disable input if the previous one is empty (for index > 0)
          disabled={index > 0 && !otp[index - 1]}
          style={{ width: '40px', height: '40px', textAlign: 'center' }}
        />
      ))}
      <Btn
        onClick={() => {
          if (isButtonActive) {
            console.log('OTP Submitted:', otp.join(''));
          }
        }}
        className={`${isButtonActive ? '' : 'opacity-50 cursor-not-allowed'} bg-violet-700`} // Adjust the classes as needed
        disabled={!isButtonActive}
      >
        Submit
      </Btn>
    </div>
  );
}

export default OTPInputComponent;

