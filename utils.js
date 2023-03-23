
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts)
}
export const validatePassword=async(password,userPassword)=>{
    return bcrypt.compare(password,userPassword);
}

process.on('message', (param) => {
    let result = {};
    for (let i = 0; i < param; i++) {
        const randomNum = Math.round(Math.random() * 1000);
        if (!result[randomNum]) {
            result[randomNum] = 1
        } else {
            result[randomNum]++
        }
    }
    process.send(result);
});

export default __dirname;