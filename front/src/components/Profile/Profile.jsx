import { useAuth0 } from "@auth0/auth0-react"
export default function Profile () {

    const {user, isAuthenticated} = useAuth0()

    return(
        isAuthenticated && (<>
        <h1>Iniciaste</h1>
        </>)
    )
}