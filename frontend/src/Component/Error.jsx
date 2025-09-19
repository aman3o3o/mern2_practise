import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Error = () => {

  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    },3000)
    toast.warn("Please Login to Continue");
  })

  return (
    <>
    <div>Please Login to Continue</div>
    </>
  )
}

export default Error