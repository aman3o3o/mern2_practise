import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import Inputform from './Inputform';

const Data = ({ token, setisauthenticated }) => {

  console.log("Data page");

  const [flag, setflag] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      setisauthenticated(false);
      navigate("/login");
    }, 2000);
    // alert("Successfully logged out");
    toast.success("Successfully logged out");
  }

  useEffect(() => {
    console.log("Data page useEffect");
    const tokenchecking = async () => {
      try {
        const res = await axios.post("http://localhost:3000/privateRoute", {}, { headers: { Authorization: token } });
        if (res.data.success) {
          setflag(true);
        }
      }
      catch (err) {
        if (err.response) {
          // alert(err.response.data.name);
          toast.error(err.response.data.name);
        }
        else {
          console.log("server gave no response at Data page");
          toast.error("server gave no response at Data page");
        }
      }
    }
    tokenchecking();
  })

  return (
    <>
      {flag ?
        <>
          {/* <div>Original Data</div> */}
          {/* a - flex h-screen */}
          <div className='a flex flex-col md:flex-row h-auto md:h-screen'>
            <Inputform setisauthenticated={setisauthenticated}/>
          </div>
          {/* <button onClick={logout}>Logout</button> */}
        </>
        : <>
          <div>UnAuthorized, Please Login to continue</div>
          <button onClick={logout}>Logout</button>
        </>}
    </>
  )
}

export default Data