import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import {  goToDashboard, goToEditInfo, goToEditPassword, goBack } from "../../routes/coordinator"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../parameters"


function Users() {

    useProtectPage()

    const history = useHistory()
    const [users, setUsers] = useState([])

    useEffect( async () => {

        try {

            const headers =  { headers: { Authorization: localStorage.getItem("token") } }

            const response = await axios.get(`${baseUrl}/users/all`, headers)

            setUsers(response.data.users)
        }
        catch (error) {

            goToDashboard(history)
        }
    })

    const deleteUser = async (userId) => {

        try {

            const headers =  { headers: { Authorization: localStorage.getItem("token") } }

            if (window.confirm("Você tem certeza que quer apagar esse usuário?")) {
                
                await axios.delete(`${baseUrl}/users/delete/${userId}`, headers)
            }

            window.alert("Usuário apagado com sucesso!")
        }
        catch(error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>
            <h1>Users</h1>
            {users && users.map(user => {
                return (
                <div>
                    <hr/>
                    <h3>{user.name}</h3>
                    <h3>{user.nickname}</h3>
                    <h3>{user.email}</h3>
                    <h3>{user.cpf}</h3>
                    <button onClick={() => goToEditInfo(history, user.id)}>Editar Informações</button>
                    <button onClick={() => goToEditPassword(history, user.id)}>Editar Senha</button>
                    <button onClick={() => deleteUser(user.id)}>Apagar</button>
                </div>)
            })}
            <button onClick={() => goBack(history)}>Voltar</button>
        </div>
    )
}

export default Users