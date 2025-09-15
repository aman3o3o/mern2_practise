// library import
import React from 'react'
import styles from "./Inputform.module.css"
import { useState } from 'react'

// component import
import Databox from './Databox'

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
            let res = await axios.post("http://localhost:3000/todo/insert-dataOne",input);
            if (res.data.success){
                alert(res.data.message);
                console.log(res.data);
            }
        }
        catch(err){
            if (err.response){
                alert(`${err.response.data.message}, new user not added`);
                console.log("client side insert-dataOne err.response");
                console.log(err.response);
            }
            else{
                alert("server given no response")
                console.log(err);
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
                    <button>Submit</button>
                </div>
            </form>
            <Databox setinput={setinput}/>
        </>
    )
}

export default Inputform