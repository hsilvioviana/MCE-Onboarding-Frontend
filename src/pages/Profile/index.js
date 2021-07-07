import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { baseUrl } from "../../parameters"
import { goBack, goToDashboard, goToEditProfile, goToLogout } from "../../routes/coordinator"
import { Container, Body, Forms } from "./styled"
import Button from "../../components/Button";


function Profile() {

    useProtectPage()

    const history = useHistory()
    const { id } = useParams()

    const [user, setUser] = useState({})

    useEffect( async () => {

        await getUser()
    }, [])

    const getUser = async () => {

        try {

            const token = localStorage.getItem("token")

            const headers =  { headers: { Authorization: token } }

            const response = await axios.get(`${baseUrl}/users/profile/${id}`, headers)

            setUser(response.data.user)
        }
        catch (error) {

            goBack(history)
        }
    }

    const deleteUser = async () => {

        try {

            const headers =  { headers: { Authorization: localStorage.getItem("token") } }

            if (window.confirm("Você tem certeza que quer apagar sua conta?")) {
                
                await axios.delete(`${baseUrl}/users/delete/${id}`, headers)
                window.alert("Conta apagada com sucesso!")
                goToLogout(history)
            }

            goToDashboard(history)
        }
        catch(error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <Container>
            <Body>
            <h1>Perfil</h1>

            <h3>Nome: {user.name}</h3>
            <h3>Apelido: {user.nickname}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Cpf: {user.cpf}</h3>

            <Forms onSubmit={""}>

                <Button onClick={() => goToEditProfile(history, user.id)}>Editar Perfil</Button>
                <Button onClick={deleteUser}>Apagar Conta</Button>

            </Forms>
            
            <br/>
            <a href="/">Voltar</a>
            </Body>
        </Container>
    )
}

export default Profile
