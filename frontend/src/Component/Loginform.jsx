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
      <div className='w-screen h-screen flex flex-col justify-center items-center p-[40px] sm:p-4 bg-teal-100'>
        <form
          className='h-[70%] w-[100%] sm:w-[40%] lg:w-[30%] sm:h-[60%] flex flex-col justify-evenly items-center whitespace-nowrap p-4 gap-y-[15px] bg-white'
          onSubmit={onsubmit}
        >
          <div className='rounded-[3px] px-[5px] bg-blue-200'>Login-Form</div>

          <div className='self-start w-full rounded-[50px] px-[15px] bg-yellow-100'>
            <label>Email : <input
              className="w-[80%] outline-none"
              name="email"
              placeholder="enter email"
              required
              onInput={typing}
              value={login.name}
            />
            </label>
          </div>

          <div className='self-start w-full rounded-[50px] px-[15px] bg-pink-100'>
            <label htmlFor='password'>Password : </label>
            <input
              className="w-[70%] outline-none"
              name="password"
              id="password"
              placeholder="enter password"
              required
              onInput={typing}
              value={login.password}
            />
          </div>

          <button className='self-stretch rounded-[3px] bg-purple-800 text-white hover:bg-purple-700 transition-colors duration-20'>Login</button>

          <p className='whitespace-normal text-[12px] sm:whitespace-nowrap self-stretch text-center bg-green-100'>
            Don't have an account? -- <Link to="/signup" className='hover:underline'>Register here</Link>
          </p>
        </form>
      </div>



      {/* <div className='w-screen h-screen flex flex-col justify-center items-center p-[40px] sm:p-4'>
        <form className='h-[70%] w-[100%] sm:w-[40%] lg:w-[30%] sm:h-[60%] flex flex-col justify-evenly items-center whitespace-nowrap p-4 gap-y-[15px]' onSubmit={onsubmit}>
          <div className='rounded-[3px] px-[5px]'>Login-Form</div>
            <div className='self-start w-full rounded-[50px] px-[15px]'>
              <label>Email : <input className="w-[80%] outline-none" name="email" placeholder="enter email" required onInput={typing} value={login.name} />
              </label>
            </div>
            <div className='self-start w-full rounded-[50px] px-[15px]'>
              <label htmlFor='password'>Password : </label>
              <input className="w-[70%] outline-none" name="password" id="password" placeholder="enter password" required onInput={typing} value={login.password} />
            </div>
            <button className='self-stretch rounded-[3px]'>Login</button>
            <p className='whitespace-normal text-[12px] sm:whitespace-nowrap self-stretch text-center'>Don't have an account? -- <Link to="/signup" className='hover:underline'>Register here</Link></p>
        </form> */}
      {/* <div className='whitespace-nowrap'>Don't have account -- <Link to="/signup">Register here</Link></div> */}
      {/* </div> */}

      {/* <div className="bg-red-500 w-screen min-h-screen flex flex-col justify-center items-center p-4">
  <form 
    className="bg-yellow-500 w-full max-w-md sm:w-1/3 sm:h-auto flex flex-col justify-evenly items-center p-6 rounded-lg shadow-lg"
    onSubmit={onsubmit}
  >
    <div className="bg-pink-500 self-stretch mb-4 p-2 rounded">
      <label className="block mb-1 font-semibold" htmlFor="email">
        Email:
      </label>
      <input 
        type="email"
        name="email"
        id="email"
        placeholder="Enter email"
        required
        onInput={typing}
        value={login.name}
        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="bg-orange-500 self-stretch mb-6 p-2 rounded">
      <label className="block mb-1 font-semibold" htmlFor="password">
        Password:
      </label>
      <input 
        type="password"
        name="password"
        id="password"
        placeholder="Enter password"
        required
        onInput={typing}
        value={login.password}
        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <button 
      type="submit" 
      className="bg-red-200 self-stretch py-3 rounded font-semibold hover:bg-red-300 transition"
    >
      Login
    </button>

    <div className="mt-4 text-center text-sm text-white">
      Don't have an account? -- <Link className="text-blue-300 underline" to="/signup">Register here</Link>
    </div>
  </form>
</div> */}

    </>
  )
}

export default Loginform