// package imports
import React, { useEffect, useState } from 'react'
import styles from "./Databox.module.css"
import axios from "axios"

// component imports
import No_data_flag from './No_data_flag'

const Databox = ({ setinput, fetchdata, tododata }) => {

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
            <div className='bg-yellow-200 flex-6 min-w-0 flex flex-col items-center justify-evenly'>
                <h2>Data Table</h2>
                <h2>Welcome Aman , here is your Data</h2>
                <div className='h-[60%] bg-amber-950 overflow-hidden hover:overflow-auto'>
                    <table className='bg-red-500 border-separate border-spacing-[10px]'>
                        <tr>
                            <th className="border-2 text-center">Name</th>
                            <th className="border-2 text-center">Email</th>
                            <th className="border-2 text-center">Number</th>
                            <th className="border-2 text-center">Age</th>
                            <th className="border-2 text-center">Dob</th>
                            <th className="border-2 text-center">Action</th>
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
                                <tr>
                                    <td className="border-2 text-center px-[5px]">{data.name}</td>
                                    <td className="border-2 text-center px-[5px]">{data.email}</td>
                                    <td className="border-2 text-center px-[5px]">{data.number}</td>
                                    <td className="border-2 text-center px-[5px]">{data.age}</td>
                                    <td className="border-2 text-center px-[5px]">{data.dob}</td>
                                    <td className="border-2 text-center px-[5px]">
                                        <button className="mr-[5px]" onClick={() => { onedit(data._id, data.name, data.email, data.number, data.age, data.dob) }}>Edit</button>
                                        <button className="ml-[5px]" onClick={() => { ondelete(data._id) }}>Delete</button>
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
                <button onClick={logout}>Logout</button>
            </div>
        </>
    )
}

export default Databox