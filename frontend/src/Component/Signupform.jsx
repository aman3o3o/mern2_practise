import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'
import signup_img from "../images/signup.png"

const Signupform = ({ setisauthenticated }) => {

    console.log("Signupform page");

    let navigate = useNavigate();

    const [signup, setsignup] = useState({
        name: "",
        email: "",
        password: ""
    })

    const typing = (e) => {
        let copy = { ...signup };
        copy[e.target.name] = e.target.value;
        setsignup(copy);
    }

    const onsubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post("http://localhost:3000/signup/insert-dataOne", signup);
            if (res.data.success) {
                setTimeout(() => {
                    navigate("/login");
                    setsignup({
                        name: "",
                        email: "",
                        password: ""
                    })
                }, 3000);
                // alert(res.data.message);
                toast.success(res.data.message);
            }
        }
        catch (err) {
            if (err.response) {
                console.log("signuppage (/signup/insert-dataOne) err.response - ");
                console.log(err.response);
                // alert(err.response.data.name);
                toast.error(err.response.data.name);
            }
            else {
                console.log("server gave no response - signuppage (/signup/insert-dataOne)");
                toast.error("server gave no response - signuppage (/signup/insert-dataOne)");
            }
        }
    }
    return (
        <>
            <div className="w-screen min-h-screen flex justify-center items-center bg-red-200">
                <form
                    className="w-full max-w-sm bg-white flex flex-col items-center p-4 space-y-4"
                    onSubmit={onsubmit}
                >
                    <h1 className="text-xl">Signup-Form</h1>

                    <div className="w-1/2 rounded-2xl">
                        <img src={signup_img} alt="" className="w-full rounded-2xl" />
                    </div>

                    <input
                        className="py-2 px-4 rounded-2xl w-2/3 bg-blue-100"
                        name="name"
                        placeholder="Enter name"
                        required
                        value={signup.name}
                        onInput={typing}
                    />
                    <input
                        className="py-2 px-4 rounded-2xl w-2/3 bg-blue-100"
                        name="email"
                        placeholder="Enter email"
                        required
                        value={signup.email}
                        onInput={typing}
                    />
                    <input
                        className="py-2 px-4 rounded-2xl w-2/3 bg-blue-100"
                        name="password"
                        placeholder="Enter password"
                        required
                        value={signup.password}
                        onInput={typing}
                    />

                    <button className="bg-blue-500 text-white py-2 rounded w-2/3">Register</button>

                    <p className="text-sm">
                        Already have an account? <Link to="/login" className="text-blue-600">Login here</Link>
                    </p>
                </form>
            </div>

        </>
    )
}

export default Signupform