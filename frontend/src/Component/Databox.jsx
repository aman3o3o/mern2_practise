import React from 'react'
import styles from "./Databox.module.css"

const Databox = () => {
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
                    </tr>

                    <tr>
                        <td className={styles.td}>Aman Prasad</td>
                        <td className={styles.td}>amanprasad3030@gmail.com</td>
                        <td className={styles.td}>8582884500</td>
                        <td className={styles.td}>21</td>
                        <td className={styles.td}>30-11-2001</td>
                    </tr>

                </table>
            </div>
        </>
    )
}

export default Databox