import React from 'react'
import axios from "axios"
import useState from "react"

const Resetpassword = () => {

    const [formData, setformData] = useState({
        "password" : "",
        "confirmpass" : ""
    })

    const oninput = (e) => {
        let old = {...formData};
        old[e.target.name] = e.target.value;
        setformData(old);
    }

    const resetpassword = async () => {
        try{
            const res = await axios.post(`http://localhost:3000/resetpassword`,formData);
        }
        catch(err){
    }
    }
    return (
        <>
            <form onSubmit={resetpassword}>
                <input name="password" placeholder='enter password' value={formData.password} onInput={oninput}/>
                <input placeholder="confirm password" value={formData.confirmpass} onInput={oninput}/>
                <button>Submit</button>
            </form>
        </>
    )
}

export default Resetpassword
