import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { goToProfile, goToLogout, goToUsers } from "../../routes/coordinator"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"


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
        <div>
            <h1>Dashboard</h1>
            {admin && <button onClick={() => goToUsers(history)}>Usuários</button>}
            <button onClick={() => goToProfile(history, userId)}>Perfil</button>
            <button onClick={() => goToLogout(history)}>Logout</button>
        </div>
    )
}

export default Dashboard
