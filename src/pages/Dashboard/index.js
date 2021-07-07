import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { goToProfile, goToLogout, goToUsers } from "../../routes/coordinator"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { Container, Body, Forms } from "./styled"
import Button from "../../components/Button";
import Input from "../../components/Input";


function Dashboard() {

    useProtectPage()

    const history = useHistory()
    const [admin, setAdmin] = useState(false)
    const [userId, setUserId] = useState("")

    useEffect(() => {

        checkUser()
    })

    const checkUser = () => {

        const token = localStorage.getItem("token")
        const decoded = jwt_decode(token)

        if (decoded.role === "ADMIN") {

            setAdmin(true)
        }

        setUserId(decoded.id)
    }

    return (
        <Container>
            <Body>
                
            <h1>Dashboard</h1>

            <Forms onSubmit={""}>

                {admin && <Button onClick={() => goToUsers(history)}>Usuários</Button>}
                <Button onClick={() => goToProfile(history, userId)}>Perfil</Button>
                <Button onClick={() => goToLogout(history)}>Logout</Button>

            </Forms>
            </Body>
        </Container>
    )
}

export default Dashboard
