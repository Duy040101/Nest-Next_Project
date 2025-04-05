
const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPasswordHelper = async(plainPassword: string)=>{
    try {
        return await bcrypt.hash(plainPassword, saltRounds);
    } catch (error) {
        console.log(error)
    }
}
export const comparePasswordHelper = async(plainPassword: string, hashPassword:string)=>{
    try {
        const result= await bcrypt.compare(plainPassword,hashPassword);
        return result;
    } catch (error) {
        console.log(error)
    }
}