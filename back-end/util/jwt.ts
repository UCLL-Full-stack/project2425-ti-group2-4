import jwt from 'jsonwebtoken';

const generateJwtToken = ({ username, role }: any): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'Clinic API'}
    const secret = process.env.JWT_SECRET as string;

    try{
        return jwt.sign({ username, role }, secret, options)
    }catch(error) {
        console.log(error);
        throw new Error("Error generating JWT Token, see server log for details")
    }
}

export {
    generateJwtToken
}

