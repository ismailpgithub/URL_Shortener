import { useState } from 'react';
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {

    const [login, setLogin] = useState(true);

    return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 w-full max-w-md">
            { login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
        </div>
    </div>
  )
}

export default AuthPage
