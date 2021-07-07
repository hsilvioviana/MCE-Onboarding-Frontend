import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { goToDashboard, goToEditProfile, goBack } from "../../routes/coordinator"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../parameters"
import { Container, Body, Forms, User } from "./styled"
import Button from "../../components/Button";
import Input from "../../components/Input";


function Users() {

    useProtectPage()

    const history = useHistory()
    const [users, setUsers] = useState([])

    useEffect( async () => {

        await getUsers()
    })

    const getUsers = async () => {

        try {

            const headers =  { headers: { Authorization: localStorage.getItem("token") } }

            const response = await axios.get(`${baseUrl}/users/all`, headers)

            setUsers(response.data.users)
        }
        catch (error) {

            goToDashboard(history)
        }
    }

    const deleteUser = async (userId) => {

        try {

            const headers =  { headers: { Authorization: localStorage.getItem("token") } }

            if (window.confirm("Você tem certeza que quer apagar esse usuário?")) {
                
                await axios.delete(`${baseUrl}/users/delete/${userId}`, headers)
                window.alert("Usuário apagado com sucesso!")
            }
        }
        catch(error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <Container>
            <Body>

            <h1>Users</h1>
            <a href="/">Voltar</a>

            <div>
            {users && users.map(user => {
                return (
                <User>
                    <h3>Nome: {user.name}</h3>
                    <h3>Apelido: {user.nickname}</h3>
                    <h3>Email: {user.email}</h3>
                    <h3>Cpf: {user.cpf}</h3>
                    <Button onClick={() => goToEditProfile(history, user.id)}>Editar Informações</Button>
                    <Button onClick={() => deleteUser(user.id)}>Apagar</Button>
                </User>)
            })}
            </div>
            </Body>
        </Container>
    )
}

export default Users