import React from 'react';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { useLocation, useNavigate } from 'react-router-dom';

function Backbtn({ className = '', children, onClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    if (onClick) {
      onClick();
    } else {
      if (location.key !== 'default') {
        navigate(-1);
      } else {
        navigate('/'); 
      }
    }
  }

  return (
    <button
      className={`flex items-center font-InterMedium gap-2 ${className}`}
      onClick={handleClick}
    >
      <ChevronLeftOutlinedIcon className="text-purple-color-app" style={{width:"20px", height:"20px"}} />
      {children}
    </button>
  );
}

export default Backbtn;
