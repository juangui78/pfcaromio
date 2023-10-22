import { SignIn, SignUp,useAuth } from "@clerk/clerk-react"
import './Login.css'
export default function LoginForm () {

    return(
        <section className="login-section">
            <SignIn afterSignUpUrl='/registerForm'/>
        </section>
        
    )
}