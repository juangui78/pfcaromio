import {SignUp} from '@clerk/clerk-react'
export default function Register() {
    return(
        <main>
            <SignUp afterSignUpUrl='/registerForm'/>
        </main>
        
    )
}