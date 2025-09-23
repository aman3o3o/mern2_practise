// package imports
import React, { useEffect, useState } from 'react'
import styles from "./Databox.module.css"
import axios from "axios"
import { toast } from 'react-toastify'

// component imports
import No_data_flag from './No_data_flag'

const Databox = ({ setinput, fetchdata, tododata, setisauthenticated }) => {

    const logout = () => {
        localStorage.clear();
        setTimeout(() => {
            setisauthenticated(false);
            navigate("/login");
        }, 2000);
        // alert("Successfully logged out");
        toast.success("Successfully logged out");
    }

    const onedit = (id, name, email, number, age, dob) => {
        setinput({ name, email, number, age, dob, id });
    }

    const ondelete = async (id) => {
        try {
            let res = await axios.delete(`http://localhost:3000/todo/delete-dataOne/${id}`)
            if (res.data.success) {
                alert(res.data.message);
                await fetchdata();
            }
        }
        catch (err) {
            if (err.response) {
                alert(`${err.response.data.message}`);
                console.log("Databox page ondelete funct err.response - ");
                console.log(err.response);
            }
            else {
                alert("server gave no response at Databox page ondelete func");
                console.log(err);
            }
        }
    }

    return (
        <>
        {/* c - bg-gray-50 flex-6 min-w-0 flex flex-col items-center justify-evenly */}
            <div className='c w-full md:w-8/12 bg-gray-50 flex flex-col items-center justify-start p-4'>
                <h2 className='bg-[#c56c37] rounded px-[5px]'>Data Table</h2>
                <h2 className='bg-[#e26113] px-[5px]'>Welcome Aman , here is your Data</h2>
                {/* d - h-[60%] bg-white overflow-hidden hover:overflow-auto p-[10px] */}
                <div className='d w-full overflow-x-auto bg-white p-2 mt-4 rounded'>
                    {/* e - bg-gray-100 border-separate border-spacing-[10px] */}
                    <table className='e min-w-[600px] w-full bg-gray-100 border-separate border-spacing-2 text-sm md:text-base'>
                        <tr className='bg-blue-300'>
                            {/* w - border-2 text-center */}
                            <th className="w border-2 text-center px-2 sm:px-4">Name</th>
                            <th className="w border-2 text-center px-2 sm:px-4">Email</th>
                            <th className="w border-2 text-center px-2 sm:px-4">Number</th>
                            <th className="w border-2 text-center px-2 sm:px-4">Age</th>
                            <th className="w border-2 text-center px-2 sm:px-4">Dob</th>
                            <th className="w border-2 text-center px-2 sm:px-4">Action</th>
                        </tr>


                        <tr>
                            <td className={styles.td}>Aman Prasad</td>
                            <td className={styles.td}>amanprasad3030@gmail.com</td>
                            <td className={styles.td}>8582884500</td>
                            <td className={styles.td}>21</td>
                            <td className={styles.td}>30-11-2001</td>
                            <td className={styles.td}>
                                <button className={styles.edit} onClick={onedit}>Edit</button>
                                <button className={styles.delete} onClick={ondelete}>Delete</button>
                            </td>
                        </tr>

                        {tododata.map((data) => {
                            return (
                                <tr className='whitespace-nowrap'>
                                    {/* k - border-2 text-center px-[5px] */}
                                    <td className="border-2 text-center px-2 sm:px-4">{data.name}</td>
                                    <td className="border-2 text-center px-2 sm:px-4">{data.email}</td>
                                    <td className="border-2 text-center px-2 sm:px-4">{data.number}</td>
                                    <td className="border-2 text-center px-2 sm:px-4">{data.age}</td>
                                    <td className="border-2 text-center px-2 sm:px-4">{data.dob}</td>
                                    <td className="border-2 text-center px-2 sm:px-4">
                                        {/* ab - hover:bg-black hover:text-blue-900 px-[5px] */}
                                        <button className="hover:bg-black hover:text-blue-900 px-2 sm:px-4" onClick={() => { onedit(data._id, data.name, data.email, data.number, data.age, data.dob) }}>Edit</button>
                                        {/* cd - hover:text-[#5a0000] hover:bg-black px-[5px] */}
                                        <button className="hover:text-[#5a0000] hover:bg-black px-2 sm:px-4" onClick={() => { ondelete(data._id) }}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}

                        {/* {userdata.length === 0 ? <No_data_flag /> : 
                        userdata.map((data) => {
                            return (
                                <tr>
                                    <td className={styles.td}>{data.name}</td>
                                    <td className={styles.td}>{data.email}</td>
                                    <td className={styles.td}>{data.number}</td>
                                    <td className={styles.td}>{data.age}</td>
                                    <td className={styles.td}>{data.dob}</td>
                                    <td className={styles.td}>
                                        <button className={styles.edit} onClick={() => { onedit(data._id, data.name, data.email, data.number, data.age, data.dob) }}>Edit</button>
                                        <button className={styles.delete} onClick={() => { ondelete(data._id) }}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    } */}

                    </table>
                </div>
                <button className="mt-4 px-4 py-2 bg-red-400 rounded w-full md:w-auto" onClick={logout}>Logout</button>
            </div>
        </>
    )
}

export default Databox