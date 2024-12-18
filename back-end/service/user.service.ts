import { User } from '../domain/model/user';
import userDB from '../domain/data-access/user.db';
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../util/jwt";
import { AuthenticationResponse, UserInput } from '../types';
import { UnauthorizedError } from "express-jwt";



const getAllUsers = async ({username, role}: any): Promise<User[]> => {
    if(role === "admin")
        return await userDB.getAllUsers();
    else{
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this rescource.'
        });
    };
}

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const user = await userDB.getUserById({ id });
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Error fetching user');
    }
};

const createUser = async ({username, password, role}: UserInput): Promise<User> => {
    const existing = await userDB.getUserByUsername({username});
    if(existing){
        throw new Error("User with this username already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userToCreate = new User({username: username, 
                                   password: hashedPassword, 
                                   role: role});
    return await userDB.createUser(userToCreate);
}

const authenticate = async ({username, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDB.getUserByUsername({username});

    if (!user) {
        throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.getPassword())
    if(!isValidPassword){
        throw new Error("Incorrect password")
    }

    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username,
        role: user.getRole()
    }
}

export default { getUserByUsername, getAllUsers, createUser, authenticate, getUserById};
