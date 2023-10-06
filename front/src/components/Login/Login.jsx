import { useNavigate } from "react-router-dom"
import { SignIn, useAuth } from "@clerk/clerk-react"
import './Login.css'
export default function LoginForm () {

    
    const navigate  = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

    return(
        <section className="login-section">
            <SignIn />
        </section>
        
    )
}