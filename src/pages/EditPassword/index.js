import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { baseUrl } from "../../parameters"
import { goBack } from "../../routes/coordinator"
import jwt_decode from "jwt-decode"

function EditPassword() {

    useProtectPage()

    const history = useHistory()
    const [admin, setAdmin] = useState(false)
    const { id } = useParams()

    const editPasswordForm = { password: "", newPassword: "" }

    const [form, setForm] = useState(editPasswordForm)

    useEffect(() => {

        checkUser()
    })

    const checkUser = () => {

        const token = localStorage.getItem("token")
        const decoded = jwt_decode(token)

        if (decoded.role === "ADMIN") {

            setAdmin(true)
        }
    }

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const editPassword = async (event) => {

        event.preventDefault()

        try {

            const headers =  { headers: { Authorization: localStorage.getItem("token") } }

            await axios.put(`${baseUrl}/users/edit/password/${id}`, form, headers)

            goBack(history)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>
            <h1>EditPassword</h1>

            <form>
                {!admin && <input onChange={onChange} placeholder="Senha Atual" name="password" value={form.password} type="password"/>}
                <input onChange={onChange} placeholder="Senha Nova" name="newPassword" value={form.newPassword} type="password"/>
                <button onClick={editPassword}>Editar</button>
            </form>
            <button onClick={() => goBack(history)}>Voltar</button>
        </div>
    )
}

export default EditPassword
