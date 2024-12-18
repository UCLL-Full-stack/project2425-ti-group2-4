import React, { useState } from 'react';
import { StatusMessage } from "../../types";
import { useRouter } from 'next/router';
import UserService from '../../services/UserService';

const LoginForm: React.FC = () => {
    const router = useRouter()
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [loginError, setLoginError] = useState("");
    const [succesMessage, setSuccessMessage] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const clearErrors = () => {
        setUsernameError(null);
        setPasswordError(null);
        setLoginError("");
        setSuccessMessage("");
        setStatusMessages([]);
    }

    const validate = () : boolean => {
        let result = true;

        if(!username || username.trim() === ""){
            setUsernameError("username is required");
            result = false;
        }
        if(!password || password.trim() === ""){
            setPasswordError("password is required");
            result = false;
        }

        return result;
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        clearErrors();

        if(!validate()){
            return;
        }

        const user = { username, password }
        const response = await UserService.login(user);

        if(!response.ok){
          setStatusMessages([{message: `error while logging in`, type: "error"}]);
          if(response.status === 400){
            setLoginError("Incorrect username or password")
          }
        } 
        if (response.status === 200){

            const user = await response.json()
            setSuccessMessage("Login successful. Redirecting...")
            sessionStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    id: user.id,
                    token: user.token,
                    username: user.username,
                    role: user.role,
                })
            );
            setTimeout(() => {
                router.push('/');
            }, 500);
            setStatusMessages([{message: `${username} succesfully logged in`, type: "succes"}]);

        }
    };

    return (
        <>
        <h1 className = "text-center text-3xl m-4">Login</h1>
        <section>
          <form className="border p-4 rounded-md max-w-md mx-auto" onSubmit={handleSubmit}>
            {loginError && (
              <div className="text-red-800">{loginError}</div>
            )}
            {succesMessage && (
              <div className="text-green-800">{succesMessage}</div>
            )}
            <p>
              <label htmlFor="username" className="block text-base font-medium text-gray-700">Username:</label>
              <input
                data-testid="username-input"
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="form-input mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
              />
              {usernameError && (
                <div className="text-red-800">{usernameError}</div>
              )}
            </p>
            <p>
              <label htmlFor="password" className="block text-base font-medium text-gray-700">Password:</label>
              <input
                data-testid="password-input"
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-input mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
              />
              {passwordError && (
                <div className="text-red-800">{passwordError}</div>
              )}
            </p>
            <div className="flex items-center justify-between mb-4 mt-4">
            <button
                data-testid="login-button"
                type="submit"
                className="bg-transparent border-4 border-blue-400 text-black shadow-lg font-bold py-2 px-4 rounded-lg ml-8"
              >
                Login
              </button>
              <p>
                <a
                  className="bg-transparent border-4 border-blue-400 text-black shadow-lg font-bold py-2 px-4 rounded-lg mr-8"
                  onClick={() => {router.push("/login/signup")}}
                >
                  Sign Up
                </a>
              </p>
        
            </div>
          </form>
        </section>
        </>
      );
}
export default LoginForm;