import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { baseUrl } from "../../parameters"
import { goBack, goToLogout } from "../../routes/coordinator"

function EditInfo() {

    useProtectPage()

    const history = useHistory()
    const { id } = useParams()

    const editInfoForm = { name: "", nickname: "", email: "", cpf: "" }

    const [form, setForm] = useState(editInfoForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    useEffect( async () => {

        await getInfo()
    }, [])

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

    return (
        <div>
            <h1>EditInfo</h1>

            <form>
                <input onChange={onChange} placeholder="Nome" name="name" value={form.name}/>
                <input onChange={onChange} placeholder="Apelido" name="nickname" value={form.nickname}/>
                <input onChange={onChange} placeholder="Email" name="email" value={form.email}/>
                <input onChange={onChange} placeholder="Cpf" name="cpf" value={form.cpf}/>
                <button onClick={editInfo}>Editar</button>
            </form>
            <button onClick={() => goBack(history)}>Voltar</button>
        </div>
    )
}

export default EditInfo
