import React from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { useState } from "react"

const ForgotPassword = () => {

    const [formData, setformData] = useState({
        "email": ""
    })

    const getemail = (e) => {
        const old = { ...formData };
        old[e.target.name] = e.target.value;
        setformData(old);
    }

    const email_verification = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/forgotpassword`, formData);
            if (res.data.success) {
                toast.success(res.data.message);
                setformData({"email" : ""})
            }
        }
        catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            }
            else {
                console.log("forgot password error - ");
                console.log(err);
                toast.error("server gave no response");
            }
        }
    }
    return (
        <>
            <form onSubmit={email_verification}>
                <input name="email" placeholder="Enter email" value={formData.email} onInput={getemail} required/>
                <button className='block'>Submit</button>
            </form>
        </>
    )
}

export default ForgotPassword