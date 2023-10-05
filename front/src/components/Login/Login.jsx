import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
export default function LoginForm () {

    const {loginWithRedirect} = useAuth0()
    const navigate  = useNavigate()
   

    const handleLogin = (e) => {
        loginWithRedirect()
            .then(() => navigate('/creatingAccount'))
            .catch(err => console.log(err))
    }

    return(
        <button onClick={() => handleLogin()}>
            Iniciar Sesion
        </button>
    )
}