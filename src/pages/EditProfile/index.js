import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { baseUrl } from "../../parameters"
import { goBack } from "../../routes/coordinator"
import { Container, Body, Forms } from "./styled"
import Button from "../../components/Button";
import Input from "../../components/Input";
import jwt_decode from "jwt-decode"


function EditInfo() {

    useProtectPage()

    const history = useHistory()
    const { id } = useParams()
    const [admin, setAdmin] = useState(false)

    const editProfileForm = { name: "", nickname: "", email: "", cpf: "", password: "", newPassword: "" }
    
    const [form, setForm] = useState(editProfileForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    useEffect( async () => {

        checkUser()
        await getInfo()
    }, [])

    const checkUser = () => {

        const token = localStorage.getItem("token")
        const decoded = jwt_decode(token)

        if (decoded.role === "ADMIN") {

            setAdmin(true)
        }
    }

    const getInfo = async () => {

        try {

            const headers =  { headers: { Authorization: localStorage.getItem("token") } }

            const response = await axios.get(`${baseUrl}/users/profile/${id}`, headers)

            const { name, nickname, email, cpf } = response.data.user

            setForm({ name, nickname, email, cpf })
        }
        catch (error) {

            goBack(history)
        }
    }

    const editInfo = async (event) => {

        event.preventDefault()

        try {

            const headers =  { headers: { Authorization: localStorage.getItem("token") } }

            await axios.put(`${baseUrl}/users/edit/info/${id}`, form, headers)

            goBack(history)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    const editPassword = async (event) => {

        event.preventDefault()

        try {

            const headers =  { headers: { Authorization: localStorage.getItem("token") } }

            console.log(form)

            await axios.put(`${baseUrl}/users/edit/password/${id}`, form, headers)

            goBack(history)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <Container>
            <Body>

                <h1>Editar Informações</h1>
                <Forms>
                    <Input onChange={onChange} placeholder="Nome" name="name" value={form.name}/>
                    <Input onChange={onChange} placeholder="Apelido" name="nickname" value={form.nickname}/>
                    <Input onChange={onChange} placeholder="Email" name="email" value={form.email}/>
                    <Input onChange={onChange} placeholder="Cpf" name="cpf" value={form.cpf}/>
                    <Button onClick={editInfo}>Salvar</Button>
                </Forms>
                <h1>Editar Senha</h1>
                <Forms>
                    {!admin && <Input onChange={onChange} placeholder="Senha Atual" name="password" value={form.password} type="password"/>}
                    <Input onChange={onChange} placeholder="Senha Nova" name="newPassword" value={form.newPassword} type="password"/>
                    <Button onClick={editPassword}>Salvar</Button>
                </Forms>
                
                <br/>
                <a onClick={() => goBack(history)}>Voltar</a>
                <br/>

            </Body>
        </Container>
    )
}

export default EditInfo
