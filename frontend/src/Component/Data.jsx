import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Data = ({ token , setisauthenticated}) => {

  const [flag, setflag] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setisauthenticated(false);
    navigate("/login");

  }

  useEffect(async () => {
    try {
      const res = await axios.post("http://localhost:3000/privateRoute", {}, { headers: { Authorization: token } });
      if (res.data.success) {
        setflag(true);
      }
    }
    catch (err) {
      if (err.response) {
        alert(err.response.data.name);
      }
      else {
        console.log("server gave no response at Data page");
        alert("REFUSED TO CONNECT");
      }
    }
  })

  return (
    <>
      {flag ?
        <>
          <div>Original Data</div>
          <button onClick={logout}>Logout</button>
        </>
        : null}
    </>
  )
}

export default Data