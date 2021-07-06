import axios from "axios"
import { useState } from "react"
import { useHistory, useParams } from "react-router"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { baseUrl } from "../../parameters"
import { goToDashboard, goToLogin } from "../../routes/coordinator"

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
        <div>
            <h1>ChangePasswordWithCode</h1>
            <form>
                <input onChange={onChange} placeholder="Código" name="code" value={form.code}/>
                <input onChange={onChange} placeholder="Nova Senha" name="newPassword" value={form.newPassword} type="password"/>
                <button onClick={useCode}>Mudar Senha</button>
            </form>
            <button onClick={() => goToLogin(history)}>Voltar para Login</button>
        </div>
    )
}

export default ChangePasswordWithCode
