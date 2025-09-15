import React from 'react'
import {useState} from "react"

const Loginform = () => {

  const [login, setlogin] = useState({
    email : "",
    password : ""
  })

  const typing = (e) => {
    let copy = {...login};
    copy[e.target.name]=e.target.value;
    setlogin(copy);
  }

  return (
    <>
      <form className='loginform_container'>
        <div>
          <label>Email : <input name="email" placeholder="enter email" required onInput={typing} value={login.name}/>
          </label>
        </div>
        <div>
          <label htmlFor='password'>Password : </label>
          <input name="password" id="password" placeholder="enter password" required onInput={typing} value={login.password}/>
        </div>
        <button>Login</button>
      </form>
    </>
  )
}

export default Loginform