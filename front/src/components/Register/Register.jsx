import {SignUp} from '@clerk/clerk-react'
import './Register.css'

export default function Register() {
    return (
      <main className="register-main">
        <SignUp afterSignUpUrl='/registerForm' />
      </main>
    );
  }