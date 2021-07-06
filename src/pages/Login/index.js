import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { baseUrl } from "../../parameters"
import { goToDashboard, goToResetPassoword, goToSignup } from "../../routes/coordinator"

function Login() {

    useUnprotectPage()

    const history = useHistory()

    const loginForm = { email: "", password: "" }

    const [form, setForm] = useState(loginForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const login = async (event) => {

        event.preventDefault()

        try {

            const response = await axios.post(`${baseUrl}/users/login`, form)
            window.localStorage.setItem("token", response.data.token)
            goToDashboard(history)
        }
        catch (error) {

            setForm({ ...loginForm, email: form.email })
            window.alert(error.response.data.error)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <input onChange={onChange} placeholder="Email" name="email" value={form.email}/>
                <input onChange={onChange} placeholder="Senha" name="password" value={form.password} type="password"/>
                <button onClick={login}>Entrar</button>
            </form>
            <button onClick={() => goToSignup(history)}>Cadastro</button>
            <button onClick={() => goToResetPassoword(history)}>Esqueci Minha Senha</button>
        </div>
    )
}

export default Login
