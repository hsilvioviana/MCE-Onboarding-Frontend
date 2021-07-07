import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { baseUrl } from "../../parameters"
import { goToChangePasswordWithCode } from "../../routes/coordinator"
import { Container, Body, Forms } from "./styled"
import Button from "../../components/Button";
import Input from "../../components/Input";

function ResetPassword() {

    useUnprotectPage()

    const history = useHistory()

    const resetForm = { email: ""}

    const [form, setForm] = useState(resetForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const resetPassword = async (event) => {

        event.preventDefault()

        try {

            await axios.post(`${baseUrl}/users/reset/password`, form)
            goToChangePasswordWithCode(history, form.email)
        }
        catch(error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <Container>
            <Body>
                <h1>Esqueci Minha Senha</h1>
                <Forms>
                    <Input onChange={onChange} placeholder="Email" name="email" value={form.email}/>
                    <Button onClick={resetPassword}>Enviar Código de Recuperação para Email</Button>
                </Forms>
                <br/>
                <a href="/login">Voltar para Login</a>
            </Body>
        </Container>
    )
}

export default ResetPassword
