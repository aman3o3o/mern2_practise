import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Signupform = ({ setisauthenticated }) => {

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
                alert(res.data.message);
                navigate("/login");
                setsignup({
                    name: "",
                    email: "",
                    password: ""
                })
            }
        }
        catch (err) {
            if (err.response) {
                console.log("signuppage (/signup/insert-dataOne) err.response - ");
                console.log(err.response);
                alert(err.response.data.name);
            }
            else {
                console.log("server gave no response - signuppage (/signup/insert-dataOne)");
            }
        }
    }
    return (
        <>
            <form className='signupform_container' onSubmit={onsubmit}>
                <div>
                    <label>Name : <input name="name" placeholder="enter name" required value={signup.name} onInput={typing} />
                    </label>
                </div>
                <div>
                    <label htmlFor='email'>Email : </label>
                    <input name="email" id="email" placeholder="enter email" required value={signup.email} onInput={typing} />
                </div>
                <div>
                    <label htmlFor='password'>Password : </label>
                    <input name="password" id="password" placeholder="enter password" required value={signup.password} onInput={typing} />
                </div>
                <button>Register</button>
            </form>
            <div>Already have account? -- <Link to="/login">Login here</Link></div>
        </>
    )
}

export default Signupform