// library import
import React, { useEffect } from 'react'
import styles from "./Inputform.module.css"
import { useState } from 'react'
import axios from "axios"

// component import
import Databox from './Databox'
import { toast } from 'react-toastify'

const Inputform = ({setisauthenticated}) => {

    const [input, setinput] = useState({
        "name": "",
        "email": "",
        "number": "",
        "age": "",
        "dob": "",
        "id": ""
    })

    const [tododata, settododata] = useState([]);

    const fetchdata = async () => {
        try {
            let res = await axios.get("http://localhost:3000/todo/read-dataAll");
            if (res.data.success) {
                settododata(res.data.user_data);
            }
        }
        catch (err) {
            if (err.response) {
                alert(`${err.response.data.message}`);
                console.log("inputform.jsx fetchdata function error - ");
                console.log(err);
            }
            else {
                console.log("server gave no response at inputform.jsx fetchdata function");
                console.log(err);
            }
        }
    }

    const oninput = (e) => {
        let input_copy = { ...input };
        input_copy[e.target.name] = e.target.value;
        setinput(input_copy);
    }

    const onsubmit = async (e) => {
        e.preventDefault();
        if (input.id) {
            try {
                let res = await axios.put(`http://localhost:3000/todo/update-dataOne/${input.id}`, input);
                if (res.data.success) {
                    alert(res.data.message);
                    setinput({
                        "name": "",
                        "email": "",
                        "number": "",
                        "age": "",
                        "dob": "",
                        "id": ""
                    })
                    await fetchdata();
                }
            }
            catch (err) {
                if (err.response) {
                    alert(err.response.data.message);
                    console.log("client side update-dataOne err.response");
                    console.log(err.response);
                }
                else {
                    console.log("server gave no response");
                    console.log(err);
                }
            }
        }
        else {
            try {
                let res = await axios.post("http://localhost:3000/todo/insert-dataOne", input);
                if (res.data.success) {
                    alert(res.data.message);
                    fetchdata();
                }
            }
            catch (err) {
                if (err.response) {
                    alert(err.response.data.message);
                    console.log("client side insert-dataOne err.response - ");
                    console.log(err.response);
                }
                else {
                    alert("server given no response at insert-dataOne")
                    console.log(err);
                }
            }
        }
    }

    useEffect(() => {
        const fetchingData = async () => {
            try {
                await fetchdata();
                toast.success("Data fetched successfully");
            }
            catch (err) {
                toast.warn("Data not fetched");
            }
        }
        fetchingData();
    }, [])

    return (
        <>
            {/* a - flex-4 flex flex-col items-center justify-evenly */}
            <form onSubmit={onsubmit} className='a w-full md:w-4/12 flex flex-col items-center justify-start p-4'>
                <div className='bg-[#c56c37] text-center rounded-[5px] px-[5px]'>Input Table</div>
                {/* b - bg-gray-100 w-[80%] h-[60%] flex flex-col justify-evenly p-[20px] */}
                <div className="b bg-gray-100 w-full md:w-[80%] h-auto flex flex-col p-4 space-y-4 mt-4">
                    <div className=''>
                        <label className='' htmlFor='name'>Name : </label>
                        <input name="name" placeholder="Enter Name" value={input.name} onInput={oninput} required className='py-[5px] px-[10px] appearance-auto outline'/>
                    </div>
                    <div className=''>
                        <label htmlFor='email'>Email : </label>
                        <input name="email" placeholder="Enter Email" value={input.email} onInput={oninput} required className='py-[5px] px-[10px] outline'/>
                    </div>
                    <div className=''>
                        <label htmlFor='number'>Number : </label>
                        <input name="number" placeholder="Enter Number" value={input.number} onInput={oninput} required className='py-[5px] px-[10px] outline'/>
                    </div>
                    <div className=''>
                        <label htmlFor='age'>Age : </label>
                        <input name="age" placeholder="Enter Age" value={input.age} onInput={oninput} required className='py-[5px] px-[10px] outline'/>
                    </div>
                    <div className=''>
                        <label htmlFor='dob'>Dob : </label>
                        <input name="dob" placeholder="Enter DOB" value={input.dob} onInput={oninput} required className='py-[5px] px-[10px] outline'/>
                    </div>
                </div>
                {/* m - bg-green-400 , n - 28a745 */}
                {input.id ? <button className='m bg-green-400 mt-4 px-4 py-2 rounded w-full md:w-auto'>Update</button> : <button className='n bg-[#28a745] mt-4 px-4 py-2 rounded w-full md:w-auto'>Submit</button>}
            </form>
            <Databox setinput={setinput} fetchdata={fetchdata} tododata={tododata} setisauthenticated={setisauthenticated}/>
        </>
    )
}

export default Inputform