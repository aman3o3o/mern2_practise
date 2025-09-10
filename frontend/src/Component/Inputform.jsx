import React from 'react'
import styles from "./Inputform.module.css"
import { useState } from 'react'

const Inputform = () => {

    const [input, setinput] = useState({
        "name": "",
        "email": "",
        "number": "",
        "age": "",
        "dob": ""
    })

    const oninput = (e) => {
        let input_copy = {...input};
        input_copy[e.target.name]=e.target.value;
        setinput(input_copy);
    }

    const onsubmit = async () => {
        try{
            let res = await axios.post("http://localhost:3000/insert-dataOne",input);
        }
        catch(err){
            
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
                    <button>Submit</button>
                </div>
            </form>
        </>
    )
}

export default Inputform