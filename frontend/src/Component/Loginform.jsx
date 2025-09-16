import React from 'react'
import { useState } from "react"
import { useNavigate , Link} from 'react-router-dom'
import axios from "axios"

const Loginform = ({setisauthenticated}) => {

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

  const onsubmit = (e) => {
    e.preventDefault();
    try {
      let res = axios.post("http://localhost:3000/login/read-dataOne", login);
      if (res.data.success) {
        alert(res.data.message);
        setTimeout(() => {
          setisauthenticated(true);
          navigate("/data");
        })
      }
    }
    catch(err){
      if(err.response){
        // console.log("loginform func onsubmit error - ");
        // console.log(err);
        alert(`${err.response.data.name} / ${err.response.data.message}`);
      }
      else{
        console.log("loginform func onsubmit error - ");
        console.log(err);
        alert(`${err.response.data.message} , (for proper detailing check in console)`);
      }
    }
  }

  return (
    <>
      <form className='loginform_container' onSubmit={onsubmit}>
        <div>
          <label>Email : <input name="email" placeholder="enter email" required onInput={typing} value={login.name} />
          </label>
        </div>
        <div>
          <label htmlFor='password'>Password : </label>
          <input name="password" id="password" placeholder="enter password" required onInput={typing} value={login.password} />
        </div>
        <button>Login</button>
      </form>
      <div>Don't have account -- <Link to="/signup">Register here</Link></div>
    </>
  )
}

export default Loginform