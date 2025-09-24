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
            <div className='min-h-screen bg-blue-200 flex justify-center items-center'>
                <div className='w-full max-w-sm md:max-w-md bg-red-300 m-6'>
                    <h3 className='text-xl text-center mt-4'>Signup-Form</h3>
                    <div className='my-8 w-[60%] sm:w-[50%] mx-auto rounded-full bg-pink-800'><img className="" src="https://as2.ftcdn.net/v2/jpg/15/83/83/09/1000_F_1583830902_EuC9gxLST0zxInbM8k1c8jesIQ0FRqEq.jpg" alt="" /></div>
                    <form className='flex flex-col items-center bg-red-500' onSubmit={onsubmit}>
                        <div className='bg-blue-400 mb-5 rounded-full py-1'>
                            <input className="px-4 outline-none bg-transparent placeholder:text-center" name="name" placeholder="enter name" required value={signup.name} onInput={typing} />
                        </div>
                        <div className='mb-5 rounded-full bg-blue-400 py-1'>
                            <input className="px-4 outline-none bg-transparent placeholder:text-center" name="email" id="email" placeholder="enter email" required value={signup.email} onInput={typing} />
                        </div>
                        <div className='rounded-full bg-blue-400 py-1'>
                            <input className="px-4 outline-none bg-transparent placeholder:text-center" name="password" id="password" placeholder="enter password" required value={signup.password} onInput={typing} />
                        </div>
                        <button className='cursor-pointer bg-orange-400 my-10 self-stretch mx-4'>Register</button>
                        <div className='bg-violet-300 mb-4 text-[10px]'>Already have account? -- <Link to="/login">Login here</Link></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signupform