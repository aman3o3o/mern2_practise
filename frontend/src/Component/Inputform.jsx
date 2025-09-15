// library import
import React from 'react'
import styles from "./Inputform.module.css"
import { useState } from 'react'
import axios from "axios"

// component import
import Databox from './Databox'

const Inputform = () => {

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
                    fetchdata();
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

    return (
        <>
            <form onSubmit={onsubmit}>
                <div className={styles.container}>
                    <div className="heading">Input Table</div>
                    <div className="inputtable">
                        <div>
                            <label htmlFor='name'>Name :</label>
                            <input name="name" placeholder="Enter Name" value={input.name} onInput={oninput} required />
                        </div>
                        <div>
                            <label htmlFor='email'>Email :</label>
                            <input name="email" placeholder="Enter Email" value={input.email} onInput={oninput} required />
                        </div>
                        <div>
                            <label htmlFor='number'>Number :</label>
                            <input name="number" placeholder="Enter Number" value={input.number} onInput={oninput} required />
                        </div>
                        <div>
                            <label htmlFor='age'>Age :</label>
                            <input name="age" placeholder="Enter Age" value={input.age} onInput={oninput} required />
                        </div>
                        <div>
                            <label htmlFor='dob'>Dob :</label>
                            <input name="dob" placeholder="Enter DOB" value={input.dob} onInput={oninput} required />
                        </div>
                    </div>
                    {input.id ? <button>Update</button> : <button>Submit</button>}
                </div>
            </form>
            <Databox setinput={setinput} fetchdata={fetchdata} tododata={tododata} />
        </>
    )
}

export default Inputform