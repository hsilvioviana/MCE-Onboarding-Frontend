import axios from "axios"
import { useState } from "react"
import { useHistory, useParams } from "react-router"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { baseUrl } from "../../parameters"
import { goToDashboard } from "../../routes/coordinator"
import { Container, Body, Forms } from "./styled"
import Button from "../../components/Button";
import Input from "../../components/Input";

function ChangePasswordWithCode() {

    useUnprotectPage()

    const history = useHistory()

    const { email } = useParams()

    const useCodeForm = { code: "", newPassword: "" }

    const [form, setForm] = useState(useCodeForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const useCode = async (event) => {

        event.preventDefault()

        try {

            const response = await axios.put(`${baseUrl}/users/reset/password/${email}`, form)
            window.localStorage.setItem("token", response.data.token)
            goToDashboard(history)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <Container>
            <Body>
            <h1>Nova Senha</h1>
                <Forms>
                    <Input onChange={onChange} placeholder="Código" name="code" value={form.code}/>
                    <Input onChange={onChange} placeholder="Nova Senha" name="newPassword" value={form.newPassword} type="password"/>
                    <Button onClick={useCode}>Mudar Senha</Button>
                </Forms>
                <br/>
                <a href="/login">Voltar para Login</a>
            </Body>
        </Container>
    )
}

export default ChangePasswordWithCode
