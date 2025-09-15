import React, { useEffect, useState } from 'react'
import styles from "./Databox.module.css"

const Databox = ({ setinput }) => {

    const [userdata, setuserdata] = useState([]);

    const onedit = () => {
        // setinput({

        // })
        alert("edit mode coming soon");
    }

    const ondelete = () => {
        alert("delete mode coming soon");
    }

    useEffect(async () => {
        try {
            let res = await axios.get("http://localhost:3000/todo/read-dataAll");
            if (res.data.success) {
                setuserdata(res.data.user_data);
            }
        }
        catch (err) {
            if (err.response) {
                alert(`${err.response.data.message} , data not fetched`);
                console.log("Databox page useEffect catch error - ");
                console.log(err);
            }
            else {
                console.log("server gave no response at - Databox page useEffect catch");
                console.log(err);
            }
        }
    })

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
                        {userdata.map((single_document) => {

                        })}
                    </tr>

                </table>
            </div>
        </>
    )
}

export default Databox