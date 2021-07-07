import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { baseUrl } from "../../parameters"
import { goToDashboard } from "../../routes/coordinator"
import { Container, Body, Forms } from "./styled"
import Button from "../../components/Button";
import Input from "../../components/Input";

function Login() {

    useUnprotectPage()

    const history = useHistory()

    const loginForm = { email: "", password: "" }

    const [form, setForm] = useState(loginForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
        console.log(form)
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
        <Container>
            <Body>
            <h1>Login</h1>
            <Forms>
                <Input onChange={onChange} placeholder="Email" name="email" value={form.email}/>
                <Input onChange={onChange} placeholder="Senha" name="password" value={form.password} type="password"/>
                <Button onClick={login}>Entrar</Button>
            </Forms>
            <p>Não possui uma conta ? <a href="/signup">Cadastre-se</a></p>
            <a href="/password/reset">Esqueci Minha Senha</a>
            </Body>
        </Container>
    )
}

export default Login
