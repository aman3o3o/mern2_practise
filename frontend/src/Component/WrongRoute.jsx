import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const WrongRoute = () => {

  let navigate = useNavigate();

  useEffect(() => {
    toast.warn("Route not found", {
      position: "top-right",
      autoClose: 2000
      // hideProgressBar: false,
      // closeOnClick: false,
      // pauseOnHover: true,
      // draggable: true,
      // progress: undefined,
      // theme: "light",
      // transition: Bounce,
    });
  })

  useEffect(() => {
    setTimeout(() => {
      navigate("/login")
    }, 2000);
  })
  return (
    <div>Route not found</div>
  )
}

export default WrongRoute