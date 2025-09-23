import React from 'react'
import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'

const Loginform = ({ setisauthenticated }) => {

  console.log("Loginform page");

  let navigate = useNavigate();

  const [login, setlogin] = useState({
    email: "",
    password: ""
  })

  const typing = (e) => {
    let copy = { ...login };
    copy[e.target.name] = e.target.value;
    setlogin(copy);
  }

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:3000/login/read-dataOne", login);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          setisauthenticated(true);
          navigate("/data");
        })
        // alert(res.data.message);
        toast.success(res.data.message);
      }
    }
    catch (err) {
      if (err.response) {
        console.log("loginform func onsubmit error - ");
        console.log(err);
        // alert(`${err.response.data.name} / ${err.response.data.message}`);
        toast.error(`${err.response.data.name} / ${err.response.data.message}`);
      }
      else {
        console.log("server gave no response at loginpage func onsubmit");
        toast.error("server gave no response at loginpage func onsubmit");
      }
    }
  }

  return (
    <>
      <div className='bg-red-500 w-screen h-screen flex flex-col justify-center items-center'>
        <form className='bg-yellow-500 sm:w-[40%] sm:h-[50%] flex flex-col justify-evenly items-center whitespace-nowrap' onSubmit={onsubmit}>
          <div className='h-full md:w-[60%] bg-amber-950 flex flex-col justify-evenly py-[10px] items-center'>
            <div className='bg-pink-500 self-start w-full'>
              <label>Email : <input name="email" placeholder="enter email" required onInput={typing} value={login.name} />
              </label>
            </div>
            <div className='bg-orange-500 self-start w-full'>
              <label htmlFor='password'>Password : </label>
              <input name="password" id="password" placeholder="enter password" required onInput={typing} value={login.password} />
            </div>
            <button className=''>Login</button>
            <div className='whitespace-nowrap'>Don't have an account? -- <Link to="/signup">Register here</Link></div>
          </div>
        </form>
        {/* <div className='whitespace-nowrap'>Don't have account -- <Link to="/signup">Register here</Link></div> */}
      </div>
    </>
  )
}

export default Loginform