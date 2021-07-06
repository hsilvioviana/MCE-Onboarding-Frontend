import { useEffect } from "react"
import { useHistory } from "react-router"
import { goToDashboard } from "../routes/coordinator"


const useUnprotectPage = () => {

    const history = useHistory()

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (token) {

            goToDashboard(history)
        }
    }, [history])
}

export default useUnprotectPage