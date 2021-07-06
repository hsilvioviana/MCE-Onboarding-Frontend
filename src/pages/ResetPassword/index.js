import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { baseUrl } from "../../parameters"
import { goBack, goToChangePasswordWithCode } from "../../routes/coordinator"

function ResetPassword() {

    useUnprotectPage()

    const history = useHistory()

    const resetForm = { email: ""}

    const [form, setForm] = useState(resetForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const resetPassword = async (event) => {

        event.preventDefault()

        try {

            await axios.post(`${baseUrl}/users/reset/password`, form)
            goToChangePasswordWithCode(history, form.email)
        }
        catch(error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>
            <h1>ResetPassword</h1>
            <form>
                <input onChange={onChange} placeholder="Email" name="email" value={form.email}/>
                <button onClick={resetPassword}>Enviar Código de Recuperação para Email</button>
            </form>
            <button onClick={() => goBack(history)}>Voltar</button>
        </div>
    )
}

export default ResetPassword
