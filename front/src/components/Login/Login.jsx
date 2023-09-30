import { useAuth0 } from "@auth0/auth0-react"

export default function LoginForm () {

    const {loginWithRedirect} = useAuth0()

    return(
        <button onClick={() => loginWithRedirect()}>
            Iniciar Sesion
        </button>
    )
}