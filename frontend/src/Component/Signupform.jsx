import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'

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
            <div className="w-screen h-screen bg-teal-600">
                <div className='bg-red-500 w-full h-full flex flex-col justify-center items-center p-8 sm:p-4'>
                    <form className='w-auto ssm:h-auto p-2 bg-yellow-300 flex flex-col gap-y-8 items-center ssm:w-[80%] md:w-[60%] sm:p-8' onSubmit={onsubmit}>
                        <div className='bg-red-200 ssm:self-auto w-full'>
                            <label>Name : <input name="name" placeholder="enter name" required value={signup.name} onInput={typing} />
                            </label>
                        </div>
                        <div className='bg-red-200 ssm:self-auto w-full'>
                            <label htmlFor='email'>Email : </label>
                            <input name="email" id="email" placeholder="enter email" required value={signup.email} onInput={typing} />
                        </div>
                        <div className='bg-red-200 ssm:self-auto w-full'>
                            <label htmlFor='password'>Password : </label>
                            <input name="password" id="password" placeholder="enter password" required value={signup.password} onInput={typing} />
                        </div>
                        <button className='bg-red-200'>Register</button>
                        <div className='bg-red-200'><img className="max-w-full mx-auto" src="https://as2.ftcdn.net/v2/jpg/15/83/83/09/1000_F_1583830902_EuC9gxLST0zxInbM8k1c8jesIQ0FRqEq.jpg"/></div>
                    </form>
                    <div className='bg-pink-400'>Already have account? -- <Link to="/login">Login here</Link></div>
                </div>
            </div>
        </>
    )
}

export default Signupform