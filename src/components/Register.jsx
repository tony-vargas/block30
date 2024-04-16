import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Register = () => {
    const [firstname, setFname] = useState("")
    const [lastname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            firstname,
            lastname,
            email,
            password
        }
        try {
            await axios.post('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', user)
            navigate('/successReg')
        } catch (error) {
            setError(error.response.data.message)

        }
        
        
    }

    return(
        <div class="regCont">
            <form onSubmit={handleSubmit}>
                <label className="regName">
                    First name:
                    <input 
                        type="text"
                        value={firstname}
                        onChange={(e) => {setFname(e.target.value)}}
                />
                </label>
                <label className="regLName">
                    Last Name:
                    <input 
                        type="text"
                        value={lastname}
                        onChange={(e) => {setLname(e.target.value)}}
                />
                </label>
                <label className="regEmail">
                    Email:
                    <input 
                        type="email"
                        value = {email}
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                </label>
                <label className="regPass">
                    Password:
                    <input 
                        type="text"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                </label>
                <button type="submit"  className="regButton">Register</button>
            </form>
            {
                error ? <p>{error}</p> : null
            }
        </div>
    )

}

export default Register