import React from 'react'
import "./Inputform.css"

const Inputform = () => {
  return (
    <>
    <div className='container'>
        <div>
            <label>Name :</label>
            <input placeholder="Enter Name"/>
        </div>
        <div>
            <label>Email :</label>
            <input placeholder="Enter Email"/>
        </div>
        <div>
            <label>Number :</label>
            <input placeholder="Enter Number"/>
        </div>
        <div>
            <label>Age :</label>
            <input placeholder="Enter Age"/>
        </div>
        <div>
            <label>DOB :</label>
            <input placeholder="Enter DOB"/>
        </div>
    </div>
    </>
  )
}

export default Inputform