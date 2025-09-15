// package imports
import React, { useEffect, useState } from 'react'
import styles from "./Databox.module.css"

// component imports
import No_data_flag from './No_data_flag'

const Databox = ({ setinput, fetchdata, tododata }) => {

    const onedit = (id, name, email, number, age, dob) => {
        setinput({ name, email, number, age, dob, id});
    }

    const ondelete = async (id) => {
        try {
            let res = await axios.put(`http://localhost:3000/todo/delete-dataOne/${id}`)
            if (res.data.success) {
                alert(res.data.message);
                fetchdata();
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
            <div className={styles.container}>
                <h2>Data Table</h2>
                <table className={styles.table_}>
                    <tr>
                        <th className={styles.th}>Name</th>
                        <th className={styles.th}>Email</th>
                        <th className={styles.th}>Number</th>
                        <th className={styles.th}>Age</th>
                        <th className={styles.th}>Dob</th>
                        <th className={styles.th}>Action</th>
                    </tr>

                    {/* <tr>
                        <td className={styles.td}>Aman Prasad</td>
                        <td className={styles.td}>amanprasad3030@gmail.com</td>
                        <td className={styles.td}>8582884500</td>
                        <td className={styles.td}>21</td>
                        <td className={styles.td}>30-11-2001</td>
                        <td className={styles.td}>
                            <button className={styles.edit} onClick={onedit}>Edit</button>
                            <button className={styles.delete} onClick={ondelete}>Delete</button>
                        </td>
                    </tr> */}

                    {tododata.map((data) => {
                        return (
                            <tr>
                                <td className={styles.td}>{data.name}</td>
                                <td className={styles.td}>{data.email}</td>
                                <td className={styles.td}>{data.number}</td>
                                <td className={styles.td}>{data.age}</td>
                                <td className={styles.td}>{data.dob}</td>
                                <td className={styles.td}>
                                    <button className={styles.edit} onClick={()=>{onedit(data._id,data.name,data.email,data.number,data.age,data.dob)}}>Edit</button>
                                    <button className={styles.delete} onClick={()=>{ondelete(data._id)}}>Delete</button>
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
        </>
    )
}

export default Databox