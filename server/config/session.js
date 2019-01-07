
import { time } from './.auth-const';
export const session_config = {
    key: 'account', 
    maxAge: time,
    overwrite: true,
    httpOnly: false, 
    signed: true,
    rolling: false,
    renew: false,
};