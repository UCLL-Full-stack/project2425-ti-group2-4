import React, { useState } from 'react';
import { StatusMessage } from "../../types";
import { useRouter } from 'next/router';
import UserService from '@services/UserService';

const LoginForm: React.FC = () => {
    const router = useRouter()
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [roleError, setRoleError] = useState<string | null>(null);

    const clearErrors = () => {
        setUsernameError(null);
        setPasswordError(null);
        setRoleError(null);
        setStatusMessages([]);
    }

    const validate = () : boolean => {
        let result = true;

        if(!username || username.trim() === ""){
            setUsernameError("username is required");
            result = false;
        }
        else if(username.trim().length < 4){
            setUsernameError("Username must be at least 4 characters")
            result = false;
        }

        if(!password || password.trim() === ""){
            setPasswordError("password is required");
            result = false;
        }
        if(!role || role.trim() === ""){
            setRoleError("role is required")
        }

        return result;
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        clearErrors();

        if(!validate()){
            return;
        }

        const user = { username, password, role}
        const response = await UserService.signup(user);

        if (response.status === 200){
            setTimeout(() => {
                router.push('/login');
            }, 500);
        }

        setStatusMessages([{message: `${role} with username: ${username} succesfully created`, type: "succes"}]);
    };

    return (
        <>
        <h1 className = "text-center text-3xl m-4">Signup</h1>
        <section>
            <form className="border p-4 rounded-md max-w-md mx-auto" onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="username" className="block text-base font-medium text-gray-700">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="form-input mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out mb-4"
                    />
                    {usernameError && (
                        <div className="text-red-800">{usernameError}</div>
                    )}
                </p>
                <p>
                    <label htmlFor="password" className="block text-base font-medium text-gray-700">Password:</label>
                    <input
                        id="password"
                        type="text"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="form-input mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out mb-4"
                    />
                    {passwordError && (
                        <div className="text-red-800">{passwordError}</div>
                    )}
                </p>
                <p>
                    <label htmlFor="role" className="block text-base font-medium text-gray-700">Role:</label>
                    <select 
                        name="role" 
                        id="role"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        className="mb-4"
                    >
                        <option value="">--Choose your role--</option>
                        <option value="guest">Patient</option>
                        <option value="user">Doctor</option>
                        <option value="admin">Admin</option>
                    </select>
                    {roleError && (
                        <div className="text-red-800">{roleError}</div>
                    )}
                </p>
                <div className='text-center'>
                    <button type="submit" className="bg-transparent border-4 border-blue-400 text-black shadow-lg font-bold py-2 px-4 rounded-lg">
                        Signup
                    </button>
                </div>
        </form>
        </section>
        </>
    )
}
export default LoginForm;