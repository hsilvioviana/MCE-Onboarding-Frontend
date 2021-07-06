import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { baseUrl } from "../../parameters"
import { goBack, goToEditInfo, goToEditPassword, goToLogout } from "../../routes/coordinator"

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
        }
        catch(error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>
            <h1>Profile</h1>

            <h1>{user.name}</h1>
            <h1>{user.nickname}</h1>
            <h1>{user.email}</h1>
            <h1>{user.cpf}</h1>

            <button onClick={() => goToEditInfo(history, user.id)}>Editar Informações</button>
            <button onClick={() => goToEditPassword(history, user.id)}>Editar Senha</button>
            <button onClick={deleteUser}>Apagar Conta</button>
            <button onClick={() => goBack(history)}>Voltar</button>
        </div>
    )
}

export default Profile
