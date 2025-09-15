import React from 'react'
import { useState } from 'react'

const Signupform = () => {

    const [signup, setsignup] = useState({
        name : "",
        email : ""
    })

    const typing = (e) => {
        let copy = {...signup};
        copy[e.target.name]=e.target.value;
        setsignup(copy);
    }
    return (
        <>
            <form className='signupform_container'>
                <div>
                    <label>Name : <input name="name" placeholder="enter name" required value={signup.name} onInput={typing}/>
                    </label>
                </div>
                <div>
                    <label htmlFor='email'>Email : </label>
                    <input name="email" id="email" placeholder="enter email" required value={signup.email} onInput={typing}/>
                </div>
                <button>Register</button>
            </form>
        </>
    )
}

export default Signupform