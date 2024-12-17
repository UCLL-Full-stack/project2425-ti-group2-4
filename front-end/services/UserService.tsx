import { User } from "types";

const login = async (user: User) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
}

const signup = async (user: User) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });
}

const UserService = {
    login,
    signup,
}

export default UserService;