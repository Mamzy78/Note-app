import React from "react";
import { useNavigate } from "react-router-dom";
import Btn from '../../components/button/btn'

function Intro() {
    let navigate = useNavigate();

    function clickHandler(){
        navigate("/login")
    }

    return(
    <div className="bg-purple-color-app relative max-w-md m-auto">
        <div className="flex flex-col text-center m-auto pt-20 min-h-screen">
            <img src='Illustration.svg' alt="battery" className=" px-10"/>
            <p className="leading-7 text-white text-left text-xl font-bold px-4 py-7">Jot Down anything you want to achieve, today or in the future</p>
            <img src='Indicator.svg' alt="indicator" className="m-auto mt-9"/>
        </div>
        <div className="absolute bottom-14 right-0 w-full px-4">
            <Btn className={'bg-white text-white w-full'} onClick={clickHandler}>
                <div className="flex justify-center items-center relative">
                    <p className="text-purple-color-app font-bold">Let's Get Started</p>
                    <img className="absolute right-5" src='arrow-right.svg'/>
                </div>
            </Btn>
        </div>
    </div>
    
    )
}

export default Intro